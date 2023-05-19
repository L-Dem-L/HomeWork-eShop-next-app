import React from "react";
import { useState } from "react";
import Image from "next/image";
import done from "./done.png";
import Link from "next/link";
import s from "./CardProduct.module.scss";

const CardProduct = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    // Get existing cart items from localStorage or initialize as an empty array
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product already exists in the cart
    const existingCartItem = existingCartItems.find((item) => item.id === product.id);

    // If the product is already in the cart, increase its quantity, otherwise add it as a new item
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      existingCartItems.push({ ...product, quantity: 1 });
    }

    // Save the updated cart items back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

    // Show the popup
    setShowPopup(true);
  };
  return (
    <div className={s.card}>
      <div className={s.card__product}>
        <Link className={s.card__product_link}
          product={product}
          href={`/products/${product.id}?category=${product.category}`}
        >
          <img className={s.card__product_img}
            src={product.image}
            alt={product.title}
          />
          <h3 className={s.card__product_title}>
            {product.title}
          </h3>
          <p className={s.card__product_price}>
            {product.price} USD
          </p>
        </Link>
      </div>
      <button className={s.card__btn}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      {showPopup && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={() => setShowPopup(false)}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px 50px",
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              background: "#fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              zIndex: "999",
            }}
          >
            <Image src={done} alt="done" width={50} height={50} />
            <p>Added to cart</p>
            <button 
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "#FF842C",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardProduct;
