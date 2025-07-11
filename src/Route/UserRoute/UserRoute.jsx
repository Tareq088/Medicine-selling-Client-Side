import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const UserRoute = ({children}) => {
    const {role, roleLoading} = useUserRole();
    const {user} = useAuth();
    const location = useLocation();
    
    if(roleLoading) return <Loading></Loading>;
    if(user && role === "user") return children;
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>;
};

export default UserRoute;