import React from 'react';
import useAuth from './../../Hooks/useAuth';
import Loading from './../../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const{user, loading} = useAuth();
    // console.log(user)
    const location = useLocation();
    if(loading) return Loading;
    if(user && user.email) return children;
    return <Navigate state={location.pathname} to="/login"></Navigate>
};
export default PrivateRoute;