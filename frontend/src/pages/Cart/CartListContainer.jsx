import { React, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart/CartProvider';
import { AuthContext } from '../../context/auth/AuthProvider';
import CartList from './CartList';
import axios from "axios"
import "./CartListContainer.scss";
import { Link } from "react-router-dom"
//import Spinner from '../../components/Spinner/Spinner';
import Mercadopago from '../../components/Mercadopago/Mercadopago';
import Spinner from '../../components/Spinner/Spinner';
const CartListContainer = () => {
    const { cart } = useContext(CartContext);
    const { userLoggedIn } = useContext(AuthContext);
    const [totalAmount, setTotalAmount] = useState();
    const [proccessingPurchase, setProccessingPurchase] = useState(false);
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
    const buyWithMP = async () => {
        setProccessingPurchase(true)
        let productsToBuy = []
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
            client: userLoggedIn._id, products: productsToBuy, shippingCost: 0, paymentMethod: "mercadopago", subTotal: totalAmount
        }
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout`, purchaseDetail, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        console.log(res)
        setPreferenceId(res.data.purchaseId)
        window.location.replace(res.data.redirectTo);
    }
    useEffect(() => {
        if (cart.length > 0) getCartDetail()
    }, []);
    return (
        <div className='cartContainer'>
            <div className='cartListContainer'>
                {userLoggedIn ? <CartList cart={cart} cartDetail={cartDetail} totalAmount={totalAmount} /> : <div className='cartTitle'><h2>Debes iniciar sesión para añadir al carrito</h2><Link to="/login">Iniciá sesión acá</Link></div>}
            </div>
            {proccessingPurchase ? <div className='spinnerBackground'><Spinner /></div> : null}
            <div>
                {userLoggedIn && cart.length > 0 ? <button onClick={() => buyWithMP()}>Mercado Pago</button> : null}
            </div>
        </div>
    );
}

export default CartListContainer;
