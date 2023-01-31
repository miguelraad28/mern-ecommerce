import { React, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/auth/AuthProvider';
const PurchaseFinished = ({ queryParams }) => {
    const { autoLogIn, userLoggedIn } = useContext(AuthContext);
    const verifyPayment = async (mpData) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout/verifyPayment`, mpData, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        await autoLogIn()
        console.log(res.data)
    }
    useEffect(() => {
        if (queryParams) {
            const mpData = { paymentId: queryParams.payment_id, preferenceId: queryParams.preference_id }
            verifyPayment(mpData)
        }
    }, [queryParams]);
    return (
        <div>
            <h1>Purchase Finished</h1>
            <p>{queryParams.status}</p>
            <p>{queryParams.payment_id}</p>
        </div>
    );
}
export default PurchaseFinished;