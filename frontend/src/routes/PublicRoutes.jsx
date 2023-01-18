import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({isAllowed}) => {
    if(isAllowed){
        return <Navigate to="/myaccount"/>
    }
    return <Outlet/>;
}

export default PublicRoutes;
