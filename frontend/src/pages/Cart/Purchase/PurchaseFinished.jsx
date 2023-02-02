import { React, useEffect } from 'react';
import axios from 'axios';

const PurchaseFinished = ({ queryParams }) => {
    const verifyPayment = async (mpData) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout/verifyPayment`, mpData, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
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