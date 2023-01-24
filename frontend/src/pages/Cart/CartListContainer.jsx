import { React, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart/CartProvider';
import CartDetail from './CartDetail';
import axios from "axios"
import "./CartListContainer.scss";
const CartListContainer = () => {
    const { cart } = useContext(CartContext);
    const [totalAmount, setTotalAmount] = useState();
    const [cartDetail, setCartDetail] = useState([]);
    const getCartDetail = async () => {
        let auxCartDetail = []
        let auxTotalAmount = []
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getCartDetail`, {
            headers: {
                "cart": cart
            }
        })
        auxCartDetail = res.data
        setCartDetail(auxCartDetail)
        auxCartDetail.map(detail => auxTotalAmount = [...auxTotalAmount, detail.price])
        setTotalAmount(auxTotalAmount.reduce((a, b) => a + b, 0))
    }
    useEffect(() => {
        if (cart.length > 0) getCartDetail()
    }, []);
    return (
        <div className='cartContainer'>
            <div className='cartListContainer'>
                <div>{cart.length < 1 ? <h1>Tu carrito está vacío.</h1> : <h1>Carrito de compras</h1>}</div>
                {cartDetail ? (cartDetail.map(product => <CartDetail key={product._id} product={product}/>)) : <h1>Cargando...</h1>}
                <div>Total de compra: ${totalAmount}</div>
            </div>
        </div>
    );
}

export default CartListContainer;
