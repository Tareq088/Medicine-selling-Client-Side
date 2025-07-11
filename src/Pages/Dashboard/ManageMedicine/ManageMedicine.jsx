import React from 'react';
import AddedMedicineInfo from './AddedMedicineInfo';
import AddMedicineBtn from './AddMedicineBtn';

const ManageMedicine = () => {
    return (
        <div className='my-10'>
            
            <AddMedicineBtn></AddMedicineBtn>
            <AddedMedicineInfo></AddedMedicineInfo>
        </div>
    );
};

export default ManageMedicine;