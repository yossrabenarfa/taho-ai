import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import "./ProductsPage.css"; // Importing CSS file

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Store filtered products
  const [loading, setLoading] = useState(true); // Loading state

  const [priceFilter, setPriceFilter] = useState<number | null>(null); // Price filter

  useEffect(() => {
    // Fetch products on mount
    fetchProducts()
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products); // Initially display all products
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Handle price filtering
  const handleFilterByPrice = () => {
    if (priceFilter !== null) {
      const filtered = products.filter(
        (product) => product.price <= priceFilter
      );
      setFilteredProducts(filtered); // Update filtered products
    } else {
      setFilteredProducts(products); // Show all products if no filter is applied
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="products-page">
      <h1 className="page-title">Products</h1>

      {/* Price Filter */}
      <div className="filter-container">
        <label className="filter-label">
          Filter by Price (Less than or equal to):{" "}
          <input
            type="number"
            value={priceFilter || ""}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            placeholder="Enter max price"
            className="filter-input"
          />
        </label>
        <button onClick={handleFilterByPrice} className="filter-button">
          Apply Filter
        </button>
      </div>

      {/* Products List */}
      <div className="products-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
