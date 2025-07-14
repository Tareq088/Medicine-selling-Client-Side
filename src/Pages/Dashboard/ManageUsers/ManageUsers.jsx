import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import UsersTable from './UsersTable';
import Loading from '../../../Components/Loading/Loading';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {data: users, isLoading,isFetching, refetch} = useQuery({
        queryKey:['all-users'],
        queryFn: async() =>{
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    })
    // console.log(users)
    if(isLoading || isFetching) return <Loading></Loading>
    return (
        <div>
            <h1 className='font-bold sm:text-lg md:text-xl lg:text-4xl mt-5 text-blue-800 text-center mb-6'>Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Profile Picture</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user,index) => 
                                <UsersTable 
                                    key={user._id} 
                                    user={user} 
                                    refetch = {refetch}
                                    index={index}>

                                </UsersTable>)
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default ManageUsers;