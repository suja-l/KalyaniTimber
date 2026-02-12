// src/context/StoreContext.jsx

import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("ktm_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ktm_user");
    setUser(null);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some((item) => item._id === product._id);
    if (isFavorite) {
      setFavorites((prevFavs) => prevFavs.filter((item) => item._id !== product._id));
    } else {
      setFavorites((prevFavs) => [...prevFavs, product]);
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    favorites,
    toggleFavorite,
    user,
    setUser,
    logout
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};