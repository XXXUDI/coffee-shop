import React, { createContext, useContext } from 'react';

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);

  const addToCart = (item, count) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, count: cartItem.count + count } : cartItem
        );
      }
      
      return [...prevCart, { ...item, count }];
    });
  };

  // Получить общее количество товаров в корзине
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  };

  // Получить количество уникальных товаров в корзине
  const getUniqueItemsCount = () => {
    return cart.length;
  };

  // Получить общую стоимость корзины
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + (price * item.count);
    }, 0).toFixed(2);
  };

  // Удалить товар из корзины
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Обновить количество товара в корзине
  const updateItemCount = (itemId, newCount) => {
    if (newCount <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, count: newCount } : item
        )
      );
    }
  };

  // Очистить корзину
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      updateItemCount,
      clearCart,
      getCartItemsCount,
      getUniqueItemsCount,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);