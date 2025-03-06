import { createContext, useContext, useReducer } from "react";

const cartContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch(action.type) {
    case "cart/add" :
      
      const newItem = {...action.payload, quantity : 1};
      return [...state, newItem];

    case "cart/remove" :
      return state.filter((item) => item.id !== action.payload);
    
    case "cart/decrement":
      return state.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }
        return item;
      });

    case "cart/increment":
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
  }
}


function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, initialState);
  console.log(cart);
  

  return (
    <cartContext.Provider value={{cart, dispatch}}>
      {children}
    </cartContext.Provider>
  );
}

function useCart() {
  const context = useContext(cartContext);
  return context;
}

export { CartProvider, useCart };







































// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Function to add an item to the cart
//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existingItemIndex = prevCart.findIndex((i) => i.id === item.id);
//       if (existingItemIndex >= 0) {
//         // If item already exists, increase its quantity
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += 1;
//         return updatedCart;
//       } else {
//         // If item is not in cart, add it with quantity 1
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   // Function to remove an item from the cart
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Function to update the quantity of an item in the cart
//   const updateQuantity = (id, delta) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(item.quantity + delta, 1) } // Ensure quantity doesn't go below 1
//           : item
//       )
//     );
//   };

//   // Function to clear the cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;
