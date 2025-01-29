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
            <div className={styles.basicInfo}>
                <div className={styles.imagesContainer}>
                    <div className={styles.mainImage}>
                        <div className={styles.arrowBtn}>
                            <button><i className="fa-solid fa-chevron-left"></i></button>
                        </div>
                        <div className={styles.arrowBtn}>
                            <button><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                        <img src="/static_images/card-dog.jpeg" alt="" />
                    </div>
                    <div className={styles.imageList}>
                        <img src="/static_images/card-dog.jpeg" alt="" />
                        <img src="/static_images/card-dog.jpeg" alt="" />
                        <img src="/static_images/card-dog.jpeg" alt="" />
                    </div>
                </div>

                <div className={styles.basicInfoCard}>
                    <img src="/static_images/card-dog.jpeg" alt="" />
                    <h3>Considering {petInfo.name ? petInfo.name : ''} for adoption?</h3>
                    <div className={styles.infoBelow}>
                        <div>
                            <i className="fa-solid fa-location-dot"></i>
                            <div className={styles.belowInfoContent}>
                                <span>Location</span>
                                <h6>{petInfo.location ? petInfo.location : ''}</h6>
                            </div>
                        </div>
                        <div>
                            <i className="fa-solid fa-phone"></i>
                            <div className={styles.belowInfoContent}>
                                <span>Contact</span>
                                <h6>{petInfo.contact ? petInfo.contact : ''}</h6>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoButtons}>
                        <button className='primary-btn'>Start Inquiry</button>
                        <button className='secondary-btn'>Add to Favorites</button>
                    </div>
                </div>

            </div>
            <div className={styles.moreInfo}>
                <div className={styles.moreInfoLeft}>
                    <div className={styles.introductionInfo}>
                        <span style={{ color: "orange" }}>introduction</span>
                        <h1>Meet Munchy</h1>
                        <p><span style={{ color: "orange" }}>Munchy</span> is a friendly 2-year-old Husky with striking blue eyes and a playful personality. He loves outdoor adventures and gets along well with kids and other pets. Munchy is ready to bring joy to his forever home!</p>
                    </div>
                    <hr />
                    <div className={styles.generalInfo}>
                        <span style={{ color: "grey" }}>General info</span>
                        <div>
                            <div className="infoName">
                                <h1>Name</h1>
                                <h4>{petInfo.name ? petInfo.name : ''}</h4>
                            </div>
                            <div className="infoGender">
                                <h1>Gender</h1>
                                <h4>{petInfo.gender ? petInfo.gender : ''}</h4>
                            </div>
                            <div className="infoAge">
                                <h1>Age</h1>
                                <h4>{petInfo.age ? petInfo.age : ''}</h4>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.healthInfo}>
                        <span style={{ color: "grey" }}>Health info</span>
                        <ul>
                            <li>Fully Vaccinated</li>
                            <li>Neutered</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.moreInfoRight}>
                    <h1 style={{color:"orange"}}>Personality and Traits</h1>
                    <div>
                        <span><strong>Temperament</strong>{petInfo.temperament ? petInfo.temperament : ''}</span>
                        <progress id="file" value="32" max="100"> 32% </progress>
                    </div>
                    <div>
                        <span><strong>Activity level</strong>{petInfo.temperament}</span>
                        <progress id="file" value="32" max="100"> 32% </progress>
                    </div>
                    <div>
                        <span><strong>Special skills or quirks</strong>{petInfo.temperament}</span>
                        <progress id="file" value="32" max="100"> 32% </progress>
                    </div>
                    <div>
                        <span><strong>Behavior</strong>{petInfo.temperament}</span>
                        <progress id="file" value="32" max="100"> 32% </progress>
                    </div>
                </div>
            </div>
            <div className={styles.rescueStory}>
                <h1>Rescue Story</h1>
                <p>{petInfo.rescueStory ? petInfo.rescueStory : ''}</p>
            </div>
        </div>


    );
};

export default PetDetails;
