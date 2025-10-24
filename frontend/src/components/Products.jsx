import React, { useEffect, useState } from "react";
import { client, urlFor } from "../sanityClient";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product"]{
        _id,
        title,
        price,
        discountPercent,
        image,
        category->{title}
      }`
      )
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <section className="products" id="products">
      <h1 className="heading">
        Latest <span>Products</span>
      </h1>
      <div className="product-container">
        {products.map((p) => {
          const discount = p.discountPercent || 0;
          const discountedPrice = p.price - (p.price * discount) / 100;

          return (
            <div key={p._id} className="product-box">
              {discount > 0 && <span className="discount">-{discount}%</span>}
              <div className="image">
                <img
                  src={p.image ? urlFor(p.image) : "/fallback.jpg"}
                  alt={p.title}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="content">
                <h3>{p.title}</h3>
                <div className="price">
                  ₹{discountedPrice.toFixed(0)}
                  {discount > 0 && <span>₹{p.price}</span>}
                </div>
                <p style={{ fontSize: "1.4rem" }}>{p.category?.title}</p>
                <button className="btn" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
