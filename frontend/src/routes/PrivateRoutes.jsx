import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isAllowed, loadingSession }) => {
    if (loadingSession) return null;
    if (!isAllowed) {
        return <Navigate to="/" />
    }
    return <Outlet />;
}

export default PrivateRoutes;
