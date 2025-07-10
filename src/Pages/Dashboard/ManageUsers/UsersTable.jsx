import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const UsersTable = ({ user,index,refetch}) => {
//   console.log(user);
                    //  user jodi na thake taile jeno error na ashe tai ||{} dilam
  const {name, email, role, createdAt,_id} = user || {};
  const[userRole, setUserRole] = useState(null);
//   const {} = useMutation({
//     mutationFn
//   })
  console.log(userRole);

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
                value={userRole} 
                onChange={(e)=>{setUserRole(e.target.value)}}>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="user">User</option>
            </select>
        </td>
      </tr>
    
  );
};

export default UsersTable;
