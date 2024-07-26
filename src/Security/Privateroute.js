import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMsal } from '@azure/msal-react'; // Example for authentication

const PrivateRoute = () => {
    const { accounts } = useMsal(); // Example for authentication

    return accounts.length > 0 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;