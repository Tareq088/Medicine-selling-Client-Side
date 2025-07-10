import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useUserRole = () => {
    const {user, loading: authLoading} = useAuth();
    const axiosInstance = useAxios();
    const{data:role, isPending, isLoading: roleLoading, refetch} = useQuery({
        queryKey:['role', user?.email],
        queryFn: async() =>{
            const res = await axiosInstance.get(`/users/role/${user?.email}`);
            return res.data.role;
        }
    })
    console.log(role)
    return {role, roleLoading: authLoading || roleLoading, refetch, isPending } 
};

export default useUserRole;