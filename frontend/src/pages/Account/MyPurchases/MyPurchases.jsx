import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Purchase from './Purchase';
import Spinner from '../../../components/Spinner/Spinner';

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
            <h1>Mis compras</h1>
            {purchases ? purchases.map(purchase => <Purchase  key={purchase._id} {...purchase} />) : <Spinner/>}
        </div>
    );
}

export default MyPurchases;
