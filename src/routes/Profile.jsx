import React, { useState, useEffect } from 'react';
import { getCurrentUserData, uploadPet, getMyPets, deleteMyPet, updatePetById } from '../api/apiCalls';
import MyPets from '../components/pages/profile/MyPets';
import { Link } from 'react-router-dom';
import Loader1 from '../components/loaders/Loader1';
import { useUser } from '../context/userContext';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading,setLoading] = useState(true);

    const {user} = useUser();

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
    
        fetchUserData(); // Call the async function
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div>
            <h1>Profile</h1>
            <div className="userInfo">
                {userData ? (
                    <>
                        <h1>Welcome, {userData.name}!</h1> 
                        <p>email: {userData.email}</p> 
                        {/* <p>verify status: {userData.verified ? <span style={{"color":"green"}}>Verified</span>:<span style={{"color":"red"}}>Not verified</span>}</p>  */}
                        <p>role: {userData.role}</p> 
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>

            <div className="crudActions">
                {loading ? <Loader1/>: user && user.role === "Organization" ? 
                <>
                    <Link to="/pet-form" state={{ formType: 'upload'}}><button className='primary-btn'>Upload Pet</button></Link>
                    <MyPets/>
                </> : <h1> <Link to="/animals-list">Aadopt a pet</Link></h1>
                }
            </div>
        </div>
    );
}

export default Profile;
