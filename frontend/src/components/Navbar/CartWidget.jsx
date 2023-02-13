import React from 'react';
import { Link } from 'react-router-dom';
import "./NavbarWidgets.scss";
const CartWidget = ({cart}) => {
    return (
        <Link to="/cart">
            <div className='cartIcon'>
                <i className={cart.length < 1 ? "bi bi-basket" : "bi bi-basket-fill"}></i>{cart.length > 0 ? <span><p>{cart.length}</p></span> : null}
            </div>
        </Link>
    );
}

export default CartWidget;
