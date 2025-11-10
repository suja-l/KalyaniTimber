// src/hooks/useProducts.js

import { useState, useEffect, useCallback } from "react";

// Use the proxy path that routes to your http://localhost:5000 Express server
const API_BASE_URL = "/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to memoize the fetch function
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // NOTE: This now correctly uses the Vite proxy
      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
      // Optional: Load fallback data here if needed, but for CRUD, showing the error is better.
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array ensures function remains constant

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, fetchProducts, setProducts };
}
