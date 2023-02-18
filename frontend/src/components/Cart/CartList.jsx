import React from 'react';
import CartDetail from './CartDetail';
const CartList = ({ cartDetail}) => {
    return (
        <>
            <h2 className='titleh2'>CARRITO DE COMPRAS</h2>
            {cartDetail.map(product => <CartDetail key={product._id} product={product} />)}
        </>
    );
}

export default CartList;
