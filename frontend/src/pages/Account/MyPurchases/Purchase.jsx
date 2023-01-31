import React from 'react';

const Purchase = ({ _id, products, shippingCost, paymentMethod, subTotal, createdAt }) => {
    let createdAtModified = createdAt.slice(0, 10)
    createdAtModified = createdAtModified.split("-")
    createdAtModified = createdAtModified.reverse()
    createdAtModified = createdAtModified.join(" / ")
    return (
        <div>
            <p>{_id}</p>
            <p>{createdAtModified}</p>
            <p>{subTotal}</p>
            <div style={{ border: "2px solid red" }}>
                {products ? (products.map(product => (
                    <>
                        <p>{product.name}</p>
                        <p>{product.unitPrice}</p>
                    </>)
                )) : <h1> cargando...</h1>}
            </div>
            <p>{shippingCost}</p>
            <p>{paymentMethod}</p>
        </div>
    );
}

export default Purchase;
