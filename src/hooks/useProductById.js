// src/hooks/useProductById.js

import { useState, useEffect } from "react";

// Use the proxy path that routes to your Express server
const API_BASE_URL = "/products";

export function useProductById(productId) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no productId is provided, don't try to fetch
    if (!productId) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${productId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Re-run the effect if the productId changes

  return { product, isLoading, error };
}