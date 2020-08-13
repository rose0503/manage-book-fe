import React, {useState, createContext} from 'react'
import { message } from 'antd';

export const CartContext = createContext();

export const CartProvider = (props)=> {
    const data = localStorage.getItem("cart") ?  JSON.parse(localStorage.getItem("cart")) : []
    const [cartItems, setCartItems] =useState([...data]);

    function setWithExpiry(key, value, ttl) {
        const now = new Date()

        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        }
        localStorage.setItem(key, JSON.stringify(item))
    }

    function getWithExpiry(key) {
        const itemStr = localStorage.getItem(key)

        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }

        const item = JSON.parse(itemStr)
        const now = new Date()

        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }
    
    function addToCart(book){
        // cartItems.map(i =>{
        //     if(i._id === book){
        //         message.warning("Sách này đã được thêm trong giỏ")
        //     }else{
                setCartItems(cartItems.concat(book))
                 // setWithExpiry('cart', cartItems.concat(book), (24*60*60))
                localStorage.setItem("cart", JSON.stringify(cartItems.concat(book)));
            //}
        
        
    }

    function removeItem(bookremove){
        const result = cartItems.filter((b)=> b !== bookremove)
        setCartItems(cartItems.filter((b)=> b !== bookremove))
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
            removeAll,
            setCartItems
        }}>
            {props.children}
        </CartContext.Provider>
    )
}