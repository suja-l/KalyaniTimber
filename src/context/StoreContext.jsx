// src/context/StoreContext.jsx

import React, { createContext, useState } from "react";

// 1. Create the context
export const StoreContext = createContext(null);

// 2. Create the provider component
export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // --- Cart Functions ---
  const addToCart = (product) => {
    // For now, we just add the product.
    // A more advanced cart would check quantity.
    setCartItems((prevItems) => [...prevItems, product]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  // --- Favorites Functions ---
  const toggleFavorite = (product) => {
    // Check if the item is already a favorite
    const isFavorite = favorites.some((item) => item._id === product._id);

    if (isFavorite) {
      // If it is, remove it
      setFavorites((prevFavs) =>
        prevFavs.filter((item) => item._id !== product._id)
      );
    } else {
      // If it's not, add it
      setFavorites((prevFavs) => [...prevFavs, product]);
    }
  };

  // 3. Value to be passed to consumers
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    favorites,
    toggleFavorite,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};