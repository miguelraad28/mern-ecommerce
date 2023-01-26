import { React, useContext, createContext, useState } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from '../auth/AuthProvider';
const CartContext = createContext()
const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const {userLoggedIn} = useContext(AuthContext);
    const addToCart = (_id) => {
        if (cart.includes(_id)) {
            Swal.fire("Curso ya en carrito")
        } else if(!userLoggedIn){
            Swal.fire({title: "Debes iniciar sesión para añadir productos al carrito", confirmButtonColor: 'aquamarine'})
        }else {
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
