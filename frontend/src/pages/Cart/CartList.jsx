import React from 'react';
import CartDetail from './CartDetail';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
const CartList = ({cartDetail, cart, totalAmount}) => {
    return (
        <>
            {cart.length < 1 ? <div className='cartTitle'><h2>Tu carrito está vacío.</h2><Link to="/courses">Ver productos</Link></div> : <div className='cartTitle'><h2>Carrito de compras</h2></div>}
            {cartDetail.map(product => <CartDetail key={product._id} product={product} />)}
            {cart.length < 1 ? null : <div>Total de compra: ${totalAmount}</div>}
        </>
    );
}

export default CartList;
