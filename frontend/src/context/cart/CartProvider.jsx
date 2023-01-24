import { React, createContext, useState } from 'react';
import Swal from "sweetalert2";
const CartContext = createContext()
const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const addToCart = (_id) => {
        if (cart.includes(_id)) {
            Swal.fire("Curso ya en carrito")
        } else {
            setCart([
                ...cart,
                _id
            ])
        }
    }
    const substractFromCart = (_id) => {
        let auxCart = [...cart]
        auxCart.splice((auxCart.indexOf(_id)), 1)
        setCart(auxCart)
    }
    return (
        <CartContext.Provider value={{ addToCart, substractFromCart, cart }}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };
