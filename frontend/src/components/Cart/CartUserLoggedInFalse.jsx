import React from 'react';
import {Link} from "react-router-dom"
const CartUserLoggedInFalse = () => {
    return (
        <>
            <h2 className='titleh2'>DEBES INICIAR SESIÓN PARA AÑADIR PRODUCTOS AL CARRITO</h2>
            <Link to="/login"><button className='pinkButton'>INICIAR SESIÓN</button></Link>
        </>
    );
}

export default CartUserLoggedInFalse;
