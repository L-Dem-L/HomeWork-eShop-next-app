import React, { useState, useEffect } from "react";
import s from "./cart.module.scss";
import Link from "next/link"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={s.cart}>
              <h1 className={s.cart_title}>Cart</h1>
              {cartItems.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "40px 0",
                  }}
                >
                  <p className={s.empty}>
                    Your cart is empty
                  </p>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#FF842C",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "500",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Link
                      href="/products"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                      }}
                    >
                      Catalog
                    </Link>
                  </button>
                </div>
              )}
              {cartItems.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "40px 0",
                  }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "0",
                      marginBottom: "20px",
                      fontSize: "1.4rem",
                      fontWeight: "500",
                      color: "#000",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                          width: "100%",
                          background:'#F5F5F5',
                          padding:'15px 20px'
                        }}
                      >
                        <div>
                          <img
                            src={item.image}
                            style={{
                              width: "164px",
                              height: "160px",
                              objectFit: "contain",
                              objectPosition: "center",
                              borderRadius: "10px",
                              marginBottom: "10px",
                            }}
                          ></img>
                          {item.title}
                        </div>
                        <p style={{
                            color:'#009D35'
                        }}>{item.price}USD</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#FF842C",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "500",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Link
                      href="/payment"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                      }}
                    >
                      To Order
                    </Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
