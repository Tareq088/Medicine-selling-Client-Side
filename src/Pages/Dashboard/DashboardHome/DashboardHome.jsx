import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../../../Components/Loading/Loading';
import AdminDashboard from './AdminDashboard';
import SellerDashboard from './SellerDashboard';
import UserDashboard from './UserDashboard';
import Forbidden from './../../Forbidden/Forbidden';

const DashboardHome = () => {
    const {user, loading} = useAuth();
    const{role, roleLoading} = useUserRole();
    if(!user || !role || loading || roleLoading) return <Loading></Loading>;
    else if(role === "admin" ) return <AdminDashboard></AdminDashboard>;
    else if(role === "seller" ) return <SellerDashboard></SellerDashboard>
    else if(role === "user" ) return <UserDashboard></UserDashboard>
    return <Forbidden/>
};

export default DashboardHome;