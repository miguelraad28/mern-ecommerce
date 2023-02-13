import React from 'react';
import MyPurchase from './MyPurchase';

const MyPurchasesList = ({ myPurchases }) => {

    return (
        <>
            <div className='myPurchasesList'>
                <h2 className='titleh2'>MIS COMPRAS</h2>
                {myPurchases.map(myPurchase => <MyPurchase key={myPurchase._id} {...myPurchase} />)}
            </div>
        </>
    );
}

export default MyPurchasesList;
