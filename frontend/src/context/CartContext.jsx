import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) =>
        cartItem._id === item._id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );
  
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: item.quantity }]);
    }
  };
  

  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (isItemInCart) {
        if (isItemInCart.quantity === 1) {
          // Remove item if quantity is 1
          return prevItems.filter((cartItem) => cartItem._id !== item._id);
        } else {
          // Decrement quantity
          return prevItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        }
      }
      return prevItems; // Return previous state if item is not found
    });
  };
  const remove = (item) => {
    setCartItems((prevItems) => {
      // Filter out the item you want to remove
      return prevItems.filter(cartItem => cartItem._id !== item._id);
    });
  };
  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    // Sync cartItems with local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
