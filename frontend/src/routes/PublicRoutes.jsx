import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({ isAllowed, loadingSession }) => {
    if (loadingSession) return null;
    if (isAllowed) {
        return <Navigate to="/myaccount" />
    }
    return <Outlet />;
}

export default PublicRoutes;
