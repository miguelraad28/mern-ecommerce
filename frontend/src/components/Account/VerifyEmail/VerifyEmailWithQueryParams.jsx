import { React, useEffect, useState } from 'react';
import queryString from 'query-string';
import { Navigate, useLocation } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';
const VerifyEmailWithQueryParams = ({ history, userLoggedIn }) => {
    const [queryParams, setQueryParams] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const newQueryParams = queryString.parse(location.search);
        setQueryParams(newQueryParams);
        history.replace({ search: '' });
    }, [location]);
    return (
        <>
            {userLoggedIn ? <Navigate to="/myaccount" /> : (location.search !== "" ? <VerifyEmail queryParams={queryParams} /> : <Navigate to="/" />)}
        </>
    );
}

export default VerifyEmailWithQueryParams;