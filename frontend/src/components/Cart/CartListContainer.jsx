import { React, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart/CartProvider';
import { AuthContext } from '../../context/auth/AuthProvider';
import CartList from './CartList';
import axios from "axios"
import "./CartListContainer.scss";
import { Link } from "react-router-dom"
import Spinner from '../../components/Spinner/Spinner';
const CartListContainer = () => {
    const { cart } = useContext(CartContext);
    const { userLoggedIn, setLoading, loading } = useContext(AuthContext);
    const [totalAmount, setTotalAmount] = useState();
    const [cartDetail, setCartDetail] = useState([]);
    const [preferenceId, setPreferenceId] = useState();

    let purchaseDetail = {}
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
    const proccessPurchase = async (paymentMethod) => {
        setLoading(true)
        if (paymentMethod === "mercado pago") {
            let productsToBuy = []
            // Por aca hay que upgradear el productsToBuy
            // Validar PRIMERO el CurrencyContext
            // LUEGO validar si el producto tiene OFERTA; si es así enviar el PRECIO DE OFERTA con la RESPECTIVA CURRENCY
            cartDetail.map(product => {
                productsToBuy.push({
                    _id: product._id,
                    name: product.name,
                    quantity: 1,
                    unitPrice: product.price,
                    totalPrice: product.price
                })
            })
            purchaseDetail = {
                client: userLoggedIn._id, products: productsToBuy, shippingCost: 0, paymentMethod: paymentMethod, subTotal: totalAmount
            }
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout`, purchaseDetail, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
                }
            })
            setPreferenceId(res.data.purchaseId)
            setLoading(false)
            return window.location.replace(res.data.redirectTo);
        } else if (paymentMethod === "paypal") {

        } else if (paymentMethod === "transferencia") {

        }

    }
    useEffect(() => {
        if (cart.length > 0) getCartDetail()
    }, [cart]);
    return (
        <div className='cartContainer'>
            <div className='cartListContainer'>
                {userLoggedIn ? <CartList cart={cart} cartDetail={cartDetail} totalAmount={totalAmount} /> : <div className='cartTitle'><h2>Debes iniciar sesión para añadir al carrito</h2><Link to="/login">Iniciá sesión acá</Link></div>}
            </div>
            <div className='cartPaymentButtons'>
                <button className='orangeButton'>TRANSFERENCIA</button>
                <button className='blueButton'>PAYPAL</button>
                {userLoggedIn && cart.length > 0 ? <button className='skyblueButton' onClick={() => proccessPurchase("mercado pago")}>MERCADO PAGO</button> : null}
            </div>
        </div>
    );
}

export default CartListContainer;
