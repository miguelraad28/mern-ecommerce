import React from 'react';
import Spinner from '../../../components/Spinner/Spinner';

const MyPurchase = ({ _id, products, shippingCost, paymentMethod, subTotal, createdAt }) => {
    let createdAtModified = createdAt.slice(0, 10)
    createdAtModified = createdAtModified.split("-")
    createdAtModified = createdAtModified.reverse()
    createdAtModified = createdAtModified.join(" / ")
    return (
        <div className='myPurchaseContainer'>
            <p>{_id}</p>
            <p>{createdAtModified}</p>
            <p>{subTotal}</p>
            <div style={{ border: "2px solid red" }}>
                {products ? (products.map(product => (
                    <>
                        <p>{product.name}</p>
                        <p>{product.unitPrice}</p>
                    </>)
                )) : <Spinner/>}
            </div>
            <p>{paymentMethod}</p>
        </div>
    );
}

export default MyPurchase;
