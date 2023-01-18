import React from 'react';

const Purchase = ({_id, products, shippingCost, paymentMethod, subTotal, createdAt}) => {
    let createdAtModified = createdAt.slice(0, 10)
    createdAtModified = createdAtModified.split("-")
    createdAtModified = createdAtModified.reverse()
    createdAtModified = createdAtModified.join(" / ")
    console.log(createdAtModified)
    return (
        <div>
            <p>{_id}</p>
            <p>{createdAtModified}</p>
            <p>{subTotal}</p>
            <p>{shippingCost}</p>
            <p>{paymentMethod}</p>
        </div>
    );
}

export default Purchase;
