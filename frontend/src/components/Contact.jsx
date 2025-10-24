import React from "react";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h1 className="heading">Contact <span>Us</span></h1>
      <div className="contact-content">
        <form>
          <h3>Get in Touch</h3>
          <input type="text" placeholder="Name" className="box" required />
          <input type="email" placeholder="Email" className="box" required />
          <textarea placeholder="Message" className="box" rows="5" required></textarea>
          <button type="submit" className="btn">Send</button>
        </form>
      </div>
    </section>
  );
}
