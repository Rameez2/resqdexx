import React, { useState } from 'react';
import styles from '../styles/adminPanel.module.css';
import { approveOrganization, getAllUsers, makeAdmin } from '../api/adminApi';
import { useUser } from '../context/userContext';
import OrgList from '../components/pages/adminPanel/OrgList';
import PetsList from '../components/pages/adminPanel/PetsList';

const AdminPanle = () => {
  const [selectedTab, setSelectedTab] = useState('users'); // 'users' for OrgList, 'pets' for PetsList

  return (
    <div className={styles.adminPanelContainer}>
      <h1>Welcome to Admin Panel!</h1>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${selectedTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setSelectedTab('users')}
        >
          User Management
        </button>
        <button
          className={`${styles.tabButton} ${selectedTab === 'pets' ? styles.activeTab : ''}`}
          onClick={() => setSelectedTab('pets')}
        >
          Pet Management
        </button>
      </div>
      <div className={styles.tabContent}>
        {selectedTab === 'users' && <OrgList />}
        {selectedTab === 'pets' && <PetsList />}
      </div>
    </div>
  );
};

export default AdminPanle;
