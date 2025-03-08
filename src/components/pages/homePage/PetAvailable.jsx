import React, { useRef, useState,useEffect } from 'react';
import PetCard from './PetCard';
import styles from '../../../styles/home/petAvailable.module.css';

import Loader1 from '../../loaders/Loader1';
import { getAllPets } from '../../../api/petsApi';

const PetAvailable = () => {
    const scrollContainerRef = useRef(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [pets,setPets] = useState(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust scroll distance
            if (direction === 'left') {
                scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // console.log(getAllPets());
    
    useEffect(() => {
        (async () => {
            try {
                const petsResponse = await getAllPets();
                setPets(petsResponse);
                setLoading(false);
            } catch (error) {
                console.log('Error while fetching pets',error.message);
                setLoading(false);
                setError(error.message);
            }
        })();
    }, []);


    return (
        <div style={{minHeight:"511px"}}>
            <h1 style={{ color: 'orange', textAlign: 'center' }}>Pets Available For Adoption</h1>
            <div className={styles.scrollIcons}>
                <i
                    className={`${styles.arrowIcon} arrow-icon fa-solid fa-arrow-left`}
                    onClick={() => scroll('left')}
                ></i>
                <i
                    className={`${styles.arrowIcon} arrow-icon fa-solid fa-arrow-right`}
                    onClick={() => scroll('right')}
                ></i>
            </div>
            <div
                ref={scrollContainerRef}
                className={styles.scrollContainer}
            >
            {loading ? <Loader1/>: error ? <h1>Error : {error}</h1> : 
            <>
            {pets ? pets.map((pet, index) => (
                            <PetCard
                                key={index}
                                petName={pet.name}
                                breedName={pet.breed}
                                petId={pet.$id}
                            />
                        )):
                        <h1>No pets Avaivalbe at the momemt!</h1>}
            </>
            }
            </div>
        </div>
    );
};

export default PetAvailable;
