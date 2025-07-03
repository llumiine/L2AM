// src/context/CartContext.js

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // Au lieu de throw une erreur, retourner des valeurs par défaut
    console.warn('useCart must be used within a CartProvider');
    return {
      cartCount: 0,
      addToCart: () => {},
      resetCart: () => {}
    };
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product, quantity = 1) => {
    setCartCount(prevCount => prevCount + quantity);
  };

  const resetCart = () => {
    setCartCount(0);
  };

  const value = {
    cartCount,
    addToCart,
    resetCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};