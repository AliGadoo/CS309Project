import React, { useState, useEffect } from "react";
import "./Categories.css";
export default function Categories({
  currentCategory,
  categories,
  setFilteredProducts,
  products,
  setCurrentCategory,
}) {
  useEffect(() => {
    if (categories[currentCategory] === "AllProducts") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      const lowercasedQuery = categories[currentCategory].toLowerCase();
      return product.category.toLowerCase().includes(lowercasedQuery);
    });
    setFilteredProducts(filtered);
  }, [currentCategory]);
  return (
    <div className="categories">
      {categories.map((e, i) => {
        return (
          <p
            className="category"
            key={i}
            style={
              currentCategory === i
                ? { backgroundColor: "lightgray" }
                : { backgroundColor: "" }
            }
            onClick={() => setCurrentCategory(i)}
          >
            {e}
          </p>
        );
      })}
    </div>
  );
}
