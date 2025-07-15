import React from 'react';
import AddedMedicineInfo from './AddedMedicineInfo';
import AddMedicineBtn from './AddMedicineBtn';
import { ReTitle } from 're-title';

const ManageMedicine = () => {
    return (
        <div className='my-10'>
            <ReTitle title='Medion|Manage Medicine'></ReTitle>
            <AddMedicineBtn></AddMedicineBtn>
            <AddedMedicineInfo></AddedMedicineInfo>
        </div>
    );
};

export default ManageMedicine;