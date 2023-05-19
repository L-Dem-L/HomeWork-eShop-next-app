import CardProduct from "@/components/Product/CardProduct";
import React from "react";
import { useState } from "react";

const index = ({ products }) => {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  return (
    <div>
      <div className="container">
        <div className="row m-5">
          <div className="col-3">
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
              }}
            >
              Categories
              <div
                style={{
                  borderBottom: "2px solid #000",
                  marginBottom: "10px",
                  marginTop: "10px",
                  width: "100%",
                }}
              ></div>
              <li
                style={{ cursor: "pointer",
                color: selectedCategory === "All" ? "#000" : "grey",
                fontWeight: selectedCategory === "All" ? "bold" : "normal",
                textTransform:'capitalize'
              }}
                onClick={() => setSelectedCategory("All")}
              >Show all</li>
              {categories.map((category) => (
                <li
                key={category}
                style={{ cursor: "pointer",
                color: selectedCategory === category ? "#000" : "grey",
                fontWeight: selectedCategory === category ? "bold" : "normal",
                textTransform:'capitalize'
              }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
              ))}
            </ul>
          </div>
          <div className="col-9 ">
            <h3 style={{
              textTransform:'capitalize'
            }}>{selectedCategory === "All" ? "All products" : selectedCategory}</h3>
            <div className="d-flex flex-wrap gap-3">
              {filteredProducts.map((product) => (
                <div key={product.id} style={{
                  width: "30%",
                  minHeight:'450px'
                }}>
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}

export default index;
