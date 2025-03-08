import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentUserData } from '../api/authApi';
// import MyPets from '../components/pages/profile/MyPets';
// import Loader1 from '../components/loaders/Loader1';
import Msg from '../components/pages/profile/Msg';
import styles from '../styles/profile/profile.module.css';
import GeneralSettings from '../components/pages/profile/generalSettings/GeneralSettings';
import PasswordSettings from '../components/pages/profile/PasswordSettings';
import Actions from '../components/pages/profile/actions/Actions';

const Profile = () => {
  const location = useLocation();
  // Check if an adopterId is passed in state
  const adopterIdFromState = location.state?.adopterInfo;
  // Default to 'messages' if adopterId is present; otherwise default to 'general'
  const initialOption = adopterIdFromState ? 'messages' : 'general';

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(initialOption); // Default option

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUserData(); // Fetching user data
        setUserData(data); // Setting user data into state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData(); // Call the async function once when the component mounts
  }, []);

  // Handle the selection of options in the sidebar
  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sideBard}>
        <div className={styles.sideBarOptions}>
          <div
            className={selectedOption === 'general' ? styles.selectedOption : ''}
            onClick={() => handleOptionClick('general')}
          >
            <i className="fa-solid fa-gear"></i>
            <p>General</p>
          </div>

          <div
            className={selectedOption === 'password' ? styles.selectedOption : ''}
            onClick={() => handleOptionClick('password')}
          >
            <i className="fa-solid fa-lock"></i>
            <p>Password</p>
          </div>

          <div
            className={selectedOption === 'messages' ? styles.selectedOption : ''}
            onClick={() => handleOptionClick('messages')}
          >
            <i className="fa-solid fa-message"></i>
            <p>Messages</p>
          </div>

          <div
            className={selectedOption === 'actions' ? styles.selectedOption : ''}
            onClick={() => handleOptionClick('actions')}
          >
            <i className="fa-solid fa-paw"></i>
            <p>Actions</p>
          </div>

          <div className="otherOptions">
            <button className={`primary-btn ${styles.logoutBtn}`}>
              <i className="fa-solid fa-right-from-bracket"></i> Log Out
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Display different components based on the selected option */}
        {selectedOption === 'general' && <GeneralSettings />}
        {selectedOption === 'password' && <PasswordSettings userId={userData?.$id} />}
        {selectedOption === 'messages' && <Msg adopterInfo={adopterIdFromState} />}
        {selectedOption === 'actions' && <Actions userId={userData?.$id}/>}
      </div>
    </div>
  );
};

export default Profile;
