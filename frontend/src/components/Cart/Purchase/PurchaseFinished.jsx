import { React, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { CartContext } from '../../../context/cart/CartProvider';
import "./PurchaseFinished.scss";
import { Link } from 'react-router-dom';

const PurchaseFinished = ({ queryParams }) => {
    const { setUserLoggedIn, userLoggedIn } = useContext(AuthContext)
    const { emptyCart } = useContext(CartContext)
    const verifyPayment = async (mpData) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout/verifyPayment`, mpData, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        setUserLoggedIn(res.data)
        if (queryParams.status === "approved") {
            emptyCart()
        }
    }
    useEffect(() => {
        if (queryParams) {
            const mpData = { paymentId: queryParams.payment_id, preferenceId: queryParams.preference_id }
            verifyPayment(mpData)
        }
    }, [queryParams.status]);
    return (
        <div className='container'>
            <div className='purchaseFinishedContainer'>
                <div className='purchaseFinishedStatusContainer'>
                    {queryParams.status === "approved" ?
                        <h2><i class="bi bi-patch-check-fill"></i>COMPRA APROBADA<i class="bi bi-patch-check-fill"></i></h2> :
                        <h2><i class="bi bi-patch-exclamation-fill"></i>COMPRA RECHAZADA<i class="bi bi-patch-exclamation-fill"></i></h2>}
                </div>
                <div className='purchaseFinishedDataContainer'>
                    {queryParams.status === "approved" ?
                        <div className='purchaseFinishedField'>
                            <p>Muchas gracias por confiar en nuestro contenido {userLoggedIn.name}, espero que sea de tu agrado los cursos adquiridos</p>
                        </div> : null}
                    <div className='purchaseFinishedField'>
                        {queryParams.status === "approved" ?
                            <p>Cualquier duda o consulta acerca de tu compra, siempre nos puedes contactar vía email. <span>atencioncursos@infusa.ar</span></p> :
                            <p>Ante algún falso rechazo con tu compra por favor comunícate con <span>pagos@infusa.ar</span></p>}
                    </div>
                    <div className='purchaseFinishedLastField'>
                        {queryParams.status === "approved" ?
                            <Link to="/myaccount/purchases"><button className='purpleButton'>VER MIS COMPRAS</button></Link> :
                            <p>Recomendamos verificar en las cuentas utilizadas para el pago la razón del rechazo de la compra.</p>}
                    </div>

                </div>
            </div >
        </div>
    );
}
export default PurchaseFinished;
