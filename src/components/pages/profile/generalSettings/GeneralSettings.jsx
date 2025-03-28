import React, { useState, useEffect } from 'react';
import { getCurrentUserData } from '../../../../api/authApi'; // Import API call to get user data and update it
import styles from '../../../../styles/profile/general.module.css';
import { updateUserData } from '../../../../api/userApi';
import AdopterQuestionnaire from '../adopter/AdopterQuestionnaire';
import PostUpload from './posts/PostUpload';
import PostsManage from './posts/PostsManage';

const GeneralSettings = () => {
    const [userData, setUserData] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [formData, setFormData] = useState({}); // State for the form data
    const [isModified, setIsModified] = useState(false); // State to track if changes were made

    const [isAdopterOpen, setIsAdopterOpen] = useState(false);

    const handleOpenAdopter = () => setIsAdopterOpen(true);
    const handleCloseAdopter = () => setIsAdopterOpen(false);


    // Fetch current user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getCurrentUserData(); // Fetching user data
                setUserData(data); // Storing user data in state
                setFormData({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    status: data.status,
                }); // Populate form with fetched data
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false); // Stop loading in case of an error
            }
        };

        fetchUserData(); // Call the async function
    }, []); // This effect runs once when the component mounts

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedFormData);

        // Check if the form data has changed from the original userData
        const isChanged =
            updatedFormData.name !== userData.name ||
            updatedFormData.email !== userData.email ||
            updatedFormData.role !== userData.role ||
            updatedFormData.status !== userData.status;

        setIsModified(isChanged); // Set isModified to true if there's a change
    };

    // Handle form submission to update user data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserData(userData.$id, formData); // Make the API call to update user data
            alert('User data updated successfully!');
            setIsModified(false); // Reset the modification state after successful update
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update user data');
        }
    };

    return (
        <div className={styles.general}>
            {/* <h1>General Settings</h1> */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                userData && (
                    <>
                        <form onSubmit={handleSubmit} className={styles.formContainer}>

                        <div className={styles.formInputsContainer}>

                            <div className={styles.inputGroup}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="role">Role:</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role || ''}
                                    disabled
                                />
                            </div>

                            <div className={styles.inputGroup}>
                            <label htmlFor="role">Status:</label>
                                {
                                    userData.status === "Apply" ? (
                                        <span onClick={handleOpenAdopter}>
                                            <i
                                                className="fa-solid fa-circle-check"
                                                style={{
                                                    color: "grey",
                                                    borderRadius: "50%",
                                                    fontSize: "25px",
                                                    margin: "5px",
                                                    cursor: "pointer",
                                                }}
                                            ></i>
                                            Click to verify
                                        </span>
                                    ) :
                                        userData.status === "Pending" ?
                                            (
                                                <span>
                                                    <i
                                                        className="fa-solid fa-circle-check"
                                                        style={{
                                                            color: "grey",
                                                            borderRadius: "50%",
                                                            fontSize: "25px",
                                                            margin: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                    ></i>
                                                    Pending
                                                </span>
                                            ) :
                                            userData.status === "Rejected" ? (
                                                <span onClick={handleOpenAdopter}>
                                                    <i
                                                        className="fa-solid fa-circle-check"
                                                        style={{
                                                            color: "red",
                                                            borderRadius: "50%",
                                                            fontSize: "25px",
                                                            margin: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                    ></i>
                                                    Rejected "click to apply again"
                                                </span>
                                            ) :
                                                userData.status === "Approved" ? (
                                                    <span>
                                                        <i
                                                            className="fa-solid fa-circle-check"
                                                            style={{
                                                                color: "green",
                                                                borderRadius: "50%",
                                                                fontSize: "25px",
                                                                margin: "5px",
                                                                cursor: "pointer",
                                                            }}
                                                        ></i>
                                                        Approved
                                                    </span>
                                                ) :
                                                    <></>
                                }

                            </div>

                        </div>
                           
                        <div>
                            <button
                                type="submit"
                                className={`primary-btn ${!isModified ? styles.disabledBtn : ''}`}
                                disabled={!isModified}
                            >
                                Update
                            </button>

                        </div>

                        </form>

                        {userData.role === "Adopter" ? (
                            <>
                                <AdopterQuestionnaire
                                    isOpen={isAdopterOpen}
                                    onClose={handleCloseAdopter}
                                    existingDocId={userData.more_info}
                                />
                                <PostUpload userData={userData} />
                                <PostsManage userData={userData} />
                            </>

                        ) : <></>}
                    </>
                )
            )}


        </div>
    );
};

export default GeneralSettings;
