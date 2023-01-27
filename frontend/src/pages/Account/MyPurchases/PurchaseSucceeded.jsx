import {React, useState, useEffect} from 'react';
import axios from 'axios';
const PurchaseSucceeded = () => {
    const [href, setHref] = useState();
    useEffect(() => {
        setHref(window.location.href)
    }, [window.location.href]);
    return (
        <div>
            <h1>Purchase Succeeded</h1>
            <h2>{href}</h2>
        </div>
    );
}

export default PurchaseSucceeded;
