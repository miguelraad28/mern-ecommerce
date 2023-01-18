import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdminRoutes = ({ userLoggedIn }) => {

    if (userLoggedIn.roles?.nombre === "admin") {
        return <Outlet />;
    }

    return <Navigate to="/" />;
}

export default PrivateAdminRoutes;
