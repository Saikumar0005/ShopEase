const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

// DB init (optional)
let UserModel = null;
const inMemoryUsers = [];

async function initDb() {
  if (!MONGO_URI) {
    console.warn("No MONGO_URI — using in-memory users (dev only)");
    return;
  }
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      passwordHash: String,
    });
    UserModel = mongoose.model("User", userSchema);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    UserModel = null;
  }
}
initDb();

function signToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

async function findUserByEmail(email) {
  if (UserModel) return await UserModel.findOne({ email }).lean();
  return inMemoryUsers.find((u) => u.email === email) || null;
}

async function createUser({ name, email, passwordHash }) {
  if (UserModel) {
    const u = await UserModel.create({ name, email, passwordHash });
    return { id: u._id.toString(), name: u.name, email: u.email };
  }
  const id = Date.now().toString();
  const user = { id, name, email, passwordHash };
  inMemoryUsers.push(user);
  return { id, name, email };
}

async function findUserById(id) {
  if (UserModel) {
    const u = await UserModel.findById(id).lean();
    if (!u) return null;
    return { id: u._id.toString(), name: u.name, email: u.email };
  }
  const u = inMemoryUsers.find((x) => x.id === id);
  if (!u) return null;
  return { id: u.id, name: u.name, email: u.email };
}

async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token provided" });
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name = "", email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash });
    const token = signToken(user.id);
    return res.json({ token, user });
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const found = await findUserByEmail(email);
    if (!found) return res.status(401).json({ message: "Invalid credentials" });

    const passwordHash = found.passwordHash || found.password; // handle shapes
    const ok = await bcrypt.compare(password, passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const user = { id: found.id || found._id?.toString(), name: found.name, email: found.email };
    const token = signToken(user.id);
    return res.json({ token, user });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error("me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Allowed frontend origin: ${FRONTEND_ORIGIN}`);
});
