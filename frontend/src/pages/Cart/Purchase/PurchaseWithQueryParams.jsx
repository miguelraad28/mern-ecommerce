import { React, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import PurchaseFinished from './PurchaseFinished';

const PurchaseWithQueryParams = ({ history }) => {
    const [queryParams, setQueryParams] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const newQueryParams = queryString.parse(location.search);
        setQueryParams(newQueryParams);
        history.replace({ search: '' });
        console.log(queryParams)
    }, [location]);
    return (
        <>
            <PurchaseFinished queryParams={queryParams} />
        </>
    );
}

export default PurchaseWithQueryParams;