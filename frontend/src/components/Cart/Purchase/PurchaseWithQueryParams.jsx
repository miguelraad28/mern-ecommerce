import { React, useEffect, useState, useContext } from 'react';
import queryString from 'query-string';
import { useLocation, Navigate } from 'react-router-dom';
import PurchaseFinished from './PurchaseFinished';
import { AuthContext } from '../../../context/auth/AuthProvider';

const PurchaseWithQueryParams = ({ history }) => {
    const [queryParams, setQueryParams] = useState(false);
    const {userLoggedIn} = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        const newQueryParams = queryString.parse(location.search);
        setQueryParams(newQueryParams);
        history.replace({ search: '' });
    }, [location, history]);
    return (
        <>
            {userLoggedIn ? (location.search.includes("payment_id") ? <PurchaseFinished queryParams={queryParams} /> : <Navigate to="/" />) : <Navigate to="/"/>}
        </>
    );
}

export default PurchaseWithQueryParams;