// src/hooks/useOrders.js

import { useState, useEffect, useCallback } from "react";

// Use the proxy path that routes to your Express server
const API_BASE_URL = "/orders";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to memoize the fetch function
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Return setOrders as well so the page can update state
  return { orders, isLoading, error, fetchOrders, setOrders };
}