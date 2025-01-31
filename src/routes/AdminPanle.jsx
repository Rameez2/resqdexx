import { useEffect, useState } from 'react';
import styles from '../styles/adminPanel.module.css';
import { approveOrganization, getAllUsers, makeAdmin } from '../api/adminApi';
import { useUser } from '../context/userContext';
import OrgList from '../components/pages/adminPanel/OrgList';
import PetsList from '../components/pages/adminPanel/PetsList';

const AdminPanle = () => {

    return (
        <div>
            <h1>Welcome to Admin Panel!</h1>
            <h2>Organizations Details</h2>

            
            <OrgList/>

            <PetsList/>

        </div>
    );
}

export default AdminPanle;
