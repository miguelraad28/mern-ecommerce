import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Purchase from './MyPurchase';
import Spinner from '../../../components/Spinner/Spinner';
import "./MyPurchasesListContainer.scss";
import { Link } from 'react-router-dom';
import MyPurchasesList from './MyPurchasesList';

const MyPurchasesListContainer = () => {

    const [myPurchases, setMyPurchases] = useState();
    const getPurchases = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/myAccount/purchases`, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        setMyPurchases(res.data)
    }
    useEffect(() => {
        getPurchases()
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {myPurchases ? <div className='container'>
                <div className='myPurchasesListContainer'>
                    {(myPurchases.length > 0 ? <MyPurchasesList myPurchases={myPurchases} /> :
                        <div className='emptySection'>
                            <h2>NO HAS COMPRADO NADA AÚN</h2>
                            <Link to="/courses"><button className='pinkButton'>VER CURSOS</button></Link>
                        </div>
                    )}
                </div>
            </div> : <Spinner />}
        </>
    );
}

export default MyPurchasesListContainer;
