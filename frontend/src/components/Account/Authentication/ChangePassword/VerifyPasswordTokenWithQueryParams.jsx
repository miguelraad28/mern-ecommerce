import { React, useEffect, useState } from 'react';
import queryString from 'query-string';
import { Navigate, useLocation } from 'react-router-dom';
import VerifyPasswordToken from './VerifyPasswordToken';

const VerifyPasswordTokenWithQueryParams = ({ history }) => {
    const [queryParams, setQueryParams] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const newQueryParams = queryString.parse(location.search);
        setQueryParams(newQueryParams);
        history.replace({ search: '' });
    }, [location]);
    return (
        <>
            {location.search.includes("validationToken") ? <VerifyPasswordToken queryParams={queryParams} /> : <Navigate to="/" />}
        </>
    );
}

export default VerifyPasswordTokenWithQueryParams;
