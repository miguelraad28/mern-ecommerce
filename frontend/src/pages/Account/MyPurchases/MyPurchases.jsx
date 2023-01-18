import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Purchase from './Purchase';

const MyPurchases = () => {
    
    const [purchases, setPurchases] = useState();
    const getPurchases = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/myAccount/purchases`, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        setPurchases(res.data)
    }
    useEffect(() => {
        getPurchases()
    }, []);
    return (
        <div>
            {purchases ? purchases.map(purchase => <Purchase  key={purchase._id} {...purchase} />) : <h1>cargando</h1>}
        </div>
    );
}

export default MyPurchases;
