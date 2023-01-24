import React from 'react';

const CartDetail = ({ product }) => {
    const { name, description, price, offerPrice, tumbnail } = product
    return (
        <div className='cartDetail'>
            <div className='cartDetailImage'>
                <img src={`${process.env.REACT_APP_SERVER_URL}/public/courses/tumbnails/${tumbnail}`} />
            </div>
            <div className='cartDetailInfo'>
                <p>{name}</p>
                <p>{description}</p>
            </div>
            <p>${price}</p>
        </div>
    );
}

export default CartDetail;
