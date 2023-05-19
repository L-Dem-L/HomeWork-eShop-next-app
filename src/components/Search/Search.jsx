import React, { useState } from "react";
import axios from "axios";
import s from "./Search.module.scss";
import Link from "next/link";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    const filteredProducts = response.data.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts(filteredProducts);
    setShowResults(true);
  };

  //код для реалізації debounce.
  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  // debounce використовується для затримки виконання функції handleSearch.
  const debouncedSearch = debounce(handleSearch, 1000);

  const closeResults = () => {
    setShowResults(false);
  };

  return (
    <div className={s.search}>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          // Затримка виконання handleSearch на 1000 мс.
          debouncedSearch();
        }}
      />
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
      {showResults && (
        <div
          className={s.results}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #000",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => {
              setShowResults(false);
              setSearchText("");
            }}
            className={s.results__close}
          >
            Close
          </button>
          {products.length ? (
            products.map((product) => (
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000",
                  width: "100%",
                }}
                href={`/products/${product.id}?category=${product.category}`}

                onClick={() => {
                  setShowResults(false);
                  setSearchText("");
                }}
              >
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    padding: "10px",
                    border: "1px solid #000",
                    marginBottom: "10px",
                    width: "100%",
                    maxWidth: "500px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                    src={product.image}
                    alt={product.title}
                  />
                  <div>
                    <h5>{product.title}</h5>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "green",
                      }}
                    >
                      {product.price} USD
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
