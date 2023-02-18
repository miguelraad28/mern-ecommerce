import React from 'react';
import { Link } from 'react-router-dom';
const CartEmpty = () => {
    return (
        <>
            <h2 className='titleh2'>CARRITO VACÍO</h2>
            <Link to="/courses"><button className='purpleButton'>VER CURSOS</button></Link>
        </>
    );
}

export default CartEmpty;
