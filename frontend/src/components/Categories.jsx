import React, { useEffect, useState } from "react";
import { client, urlFor } from "../sanityClient";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "category"]{_id, title, image}`)
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <section className="categories" id="categories">
      <h1 className="heading">Shop by <span>Category</span></h1>
      <div className="categories-container">
        {categories.map((cat) => (
          <div key={cat._id} className="category-card">
            <img src={urlFor(cat.image).width(400)} alt={cat.title} />
            <h3>{cat.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
