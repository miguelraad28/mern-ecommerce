import { React, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart/CartProvider';
import { AuthContext } from '../../context/auth/AuthProvider';
import CartList from './CartList';
import axios from "axios"
import "./CartListContainer.scss";
import { Link} from "react-router-dom"
import Spinner from '../../components/Spinner/Spinner';
const CartListContainer = () => {
    const { cart } = useContext(CartContext);
    const { userLoggedIn } = useContext(AuthContext);
    const [totalAmount, setTotalAmount] = useState();
    const [proccessingPurchase, setProccessingPurchase] = useState(false);
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
    
    const buyWithTransfer = async () => {
        // setProccessingPurchase(true)
        // detalleDeCompra.paymentMethod = "transfer"
        // const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout`, detalleDeCompra, {
        //     headers: {
        //         "x-access-token" : JSON.parse(localStorage.getItem("x-access-token"))
        //     }
        // })
        // window.location.replace(res.data.response.init_point);
        // console.log(res)
    }
    const buyWithPaypal = async () => {
        // setProccessingPurchase(true)
        // detalleDeCompra.paymentMethod = "paypal"
        // const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout`, detalleDeCompra, {
        //     headers: {
        //         "x-access-token" : JSON.parse(localStorage.getItem("x-access-token"))
        //     }
        // })
        // window.location.replace(res.data.response.init_point);
        // console.log(res)
    }
    const buyWithMP = async () => {
        let detalleDeCompra = {
            client: userLoggedIn._id, products: [{
                _id: cartDetail[0]._id, name: cartDetail[0].name, quantity: 1, unitPrice: cartDetail[0].price, totalPrice: cartDetail[0].price
            }], shippingCost: 0, paymentMethod: "mercadopago", subTotal: totalAmount
        }
        setProccessingPurchase(true)
        
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout`, detalleDeCompra, {
            headers: {
                "x-access-token" : JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        window.location.replace(res.data.response.init_point);
        console.log(res)
    }
    useEffect(() => {
        if (cart.length > 0) getCartDetail()
    }, []);
    return (
        <div className='cartContainer'>
            <div className='cartListContainer'>
                {userLoggedIn ? <CartList cart={cart} cartDetail={cartDetail} totalAmount={totalAmount} /> : <div className='cartTitle'><h2>Debes iniciar sesión para añadir al carrito</h2><Link to="/login">Iniciá sesión acá</Link></div>}
            </div>
            {proccessingPurchase ? <div className='spinnerBackground'><Spinner/></div>: <div><button onClick={() => buyWithTransfer()}>Transferencia</button><button onClick={() => buyWithPaypal()}>PayPal</button><button onClick={() => buyWithMP()}>Mercado Pago</button></div>}
        </div>
    );
}

export default CartListContainer;
