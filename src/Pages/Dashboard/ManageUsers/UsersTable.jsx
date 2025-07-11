import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import { toast } from "react-toastify";

const UsersTable = ({ user,index,refetch}) => {
              // user mane sokol user
//   console.log(user);
                    //  user jodi na thake taile jeno error na ashe tai ||{} dilam
  const {name, email, role, createdAt,_id} = user || {};
  const axiosSecure = useAxiosSecure();
  const[userRole, setUserRole] = useState("");
  // const mutationRole = useMutation({
  //   mutationFn: async({role}) =>{
  //     const res = await axiosSecure.patch("/users/role/${user.email}")
  //   }
  // })
  // console.log(userRole);
  const handleRoleChange = async(e,userId,userEmail, userRole, userName) =>{
    console.log(userId,userEmail, userRole);
    const res =  await axiosSecure.patch(`/users/role/${userEmail}`,{role:e.target.value})
    console.log(res.data);
    if(res.data.modifiedCount){
      toast.success(`${userName} is changed to ${userRole} role`)
      refetch();
    }
    
  }

  return (
      <tr >
        <th className="text-base">{index+1}</th>
        <td className="text-base">{name}</td>
        <td className="text-base">{email}</td>
        <td className="text-base">{createdAt}</td>
        <td className="text-base">{role}</td>
        <td className="text-base">
            <select name="role" 
                className="select"
                onChange={(e)=>{handleRoleChange(e,_id, email, role, name)}}
                value={role}
                // value={userRole} 
                // onChange={(e)=>{setUserRole(e.target.value)}}
                >
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="user">User</option>
            </select>
        </td>
      </tr>
    
  );
};

export default UsersTable;
