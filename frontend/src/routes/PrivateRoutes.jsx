import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({isAllowed}) => {
    if(!isAllowed){
        return <Navigate to="/"/>
    }
    return <Outlet/>;
}

export default PrivateRoutes;
