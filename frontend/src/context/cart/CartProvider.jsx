import { React, createContext, useState } from 'react';
import Swal from "sweetalert2";

const CartContext = createContext()
const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const getCart = () => {
        if (localStorage.getItem("cart")) {
            const auxCart = JSON.parse(localStorage.getItem("cart"))
            setCart(auxCart)
        }
    }
const addToCart = (_id) => {
    if (cart.includes(_id)) {
        Swal.fire("Curso ya en carrito")
    } else {
        const auxCart = [...cart, _id]
        setCart(auxCart)
        localStorage.setItem("cart", JSON.stringify(auxCart))
    }
}
const substractFromCart = (_id) => {
    let auxCart = [...cart]
    auxCart.splice((auxCart.indexOf(_id)), 1)
    setCart(auxCart)
    localStorage.setItem("cart", JSON.stringify(auxCart))
}
return (
    <CartContext.Provider value={{ addToCart, substractFromCart, cart, setCart, getCart }}>
        {props.children}
    </CartContext.Provider>
);
}

export { CartContext, CartProvider };
