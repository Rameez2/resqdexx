import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/petDetails.module.css';
import { getPetById } from '../api/apiCalls'; // Assume this API call is properly set up

const PetDetails = () => {
    const { id } = useParams(); // Extract the dynamic ID from the URL
    const [petInfo, setPetInfo] = useState(null); // State to store pet details
    const [loading, setLoading] = useState(true); // State to show loading state
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch the pet details using the ID
        const fetchPetDetails = async () => {
            try {
                setLoading(true);
                const data = await getPetById(id); // Replace with your API call
                setPetInfo(data); // Save the data to state
            } catch (err) {
                setError('Failed to fetch pet details.'); // Handle error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchPetDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <h1>NO PET FOUND</h1>;

    return (
        <div className={styles.petDetails}>
            <div className={styles.petDetailsLeft}>
                <div className={styles.petDetailsContent}>
                    <h1>Meet {petInfo.name}</h1>
                    <p>
                        <strong>{petInfo.name}</strong> is a friendly {petInfo.age}-year-old {petInfo.breed} with a playful personality. {petInfo.description}
                    </p>
                </div>
                <div className={styles.petDetailsBasicInfo}>
                    <h1>Basic Info</h1>
                    <div className={styles.petDetailsCard}>
                        <span><strong>Name:</strong> {petInfo.name}</span>
                        <span><strong>Age:</strong> {petInfo.age}</span>
                        <span><strong>Breed:</strong> {petInfo.breed}</span>
                        <span><strong>Gender:</strong> {petInfo.gender}</span>
                    </div>
                </div>
            </div>
            <div className={styles.petDetailsRight}>
                <img src={petInfo.imageUrl || '/static_images/card-dog.jpeg'} alt={petInfo.name} />
            </div>
        </div>
    );
};

export default PetDetails;
