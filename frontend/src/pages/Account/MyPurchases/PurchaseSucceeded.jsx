import {React, useState, useEffect} from 'react';
import axios from 'axios';
const PurchaseSucceeded = ({queryParams}) => {
    const { payment_id, status } = queryParams;
    console.log(payment_id, status)
    return (
        <div>
            <h1>Purchase Succeeded</h1>
        </div>
    );
}

export default PurchaseSucceeded;
