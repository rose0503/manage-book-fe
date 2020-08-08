import React, {useState, createContext} from 'react'

export const CartContext = createContext();

export const CartProvider = (props)=> {
    const data = localStorage.getItem("cart") ?  JSON.parse(localStorage.getItem("cart")) : []
    const [cartItems, setCartItems] =useState([...data]);
    function addToCart(book){
        setCartItems(cartItems.concat(book))
        localStorage.setItem("cart", JSON.stringify(cartItems.concat(book)));
    }

    function removeItem(bookremove){
        const result = cartItems.filter((b)=> b !== bookremove)
        setCartItems(cartItems.filter((b)=> b !== bookremove))
        //console.log('lq', cartItems.filter((b)=> b !== bookremove))
        localStorage.setItem("cart", JSON.stringify(result))
    }

    function removeAll(){
        localStorage.removeItem("cart");
        setCartItems([])
    }

    return(
        <CartContext.Provider value={{
            cartItems,
            addToCart, 
            removeItem,
            removeAll
        }}>
            {props.children}
        </CartContext.Provider>
    )
}