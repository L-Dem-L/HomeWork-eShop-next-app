import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import s from "./SingleProduct.module.scss";
import CardProduct from "@/components/Product/CardProduct";
import done from "@/components/Product/done.png"

const SingleProduct = () => {
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
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);

      
      const relatedResponse = await axios.get(
        `https://fakestoreapi.com/products/category/${response.data.category}`
      );
      const filteredProducts = relatedResponse.data.filter(
        (p) => p.id !== response.data.id
      );
      setRelatedProducts(filteredProducts.slice(0,4)); 
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-start align-items-start gap-5">
            <div
              className={s.img}
              style={{
                width: "279px",
                height: "372px",
                backgroundImage: `url("${product.image}")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            ></div>
            <div className={s.about}>
              <h3 className={s.title}>{product.title}</h3>
              <h3 className={s.price}>{product.price} USD</h3>
              <button onClick={handleAddToCart} className={s.buy}>Add to cart</button>
            </div>
          </div>
          {showPopup && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 999,
              background: "rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => setShowPopup(false)}
          />
          <div
            style={{
              width:"20%",
              height:"40%",
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
              gap: "30px",
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
        <div className="row m-5">
          <div className="col-12">
            <div className="category">
              <h3 className="category__title">Same products</h3>
              <ul className={s.list}>
                {relatedProducts.map((p) => (
                  <li key={p.id}>
                    <CardProduct product={p} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
