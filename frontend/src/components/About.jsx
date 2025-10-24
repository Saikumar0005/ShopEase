import React from "react";

export default function About() {
  return (
    <section className="about" id="about">
      <h1 className="heading">Discover <span>Your Style</span></h1>
      <div className="about-content">
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1520975698519-59c0bbddb5ea?auto=format&fit=crop&w=800&q=60"
            alt="Fashion"
          />
        </div>
        <div className="content">
          <h3>Style that speaks for you</h3>
          <p>
            At ShopEase, fashion is more than clothing — it’s confidence, comfort,
            and creativity. Our curated collections are designed for everyone, from
            streetwear lovers to trendsetters.
          </p>
          <button className="btn">Shop Collection</button>
        </div>
      </div>
    </section>
  );
}
