import React, { createContext, useState, useEffect } from 'react';

import { addItemToCart, removeItemFromCart } from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItem: () => {},
    cartItemsCount: 0
});

export const CartProvider = ({ children }) => {
    const [hidden, setHidden ] = useState(true);
    const [cartItems, setCartItems ] = useState([]);
    const [cartItemsCount, setCartItemsCount ] = useState(0);
    const [cartTotal, setCartTotal ] = useState(0);

    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);
    const clearItem = itemToClear => setCartItems(
        cartItems.filter(item=> item.id !== itemToClear.id)
    );

    useEffect(()=>{
        setCartItemsCount(
            cartItems.reduce((acc, val) => acc+val.quantity, 0)
        );
        setCartTotal(
            cartItems.reduce((acc, val) => acc+val.price*val.quantity, 0)
        );
    },[cartItems]);

    return (
        <CartContext.Provider value={{
            hidden,
            toggleHidden,
            cartItems,
            addItem,
            removeItem,
            cartItemsCount,
            cartTotal,
            clearItem
         }} >{ children }</CartContext.Provider>
    )
}