import React from 'react';
import UserPaymentHistory from '../UserPaymentHistory/UserPaymentHistory';
import { ReTitle } from 're-title';

const UserDashboard = () => {
    return (
        <div>
            <ReTitle title='Medion|Users Dashboard'></ReTitle>
            <UserPaymentHistory></UserPaymentHistory>
        </div>
    );
};

export default UserDashboard;