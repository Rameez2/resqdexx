import React, { useRef } from 'react';
import PetCard from './PetCard';
import styles from '../../../styles/home/petAvailable.module.css';

const PetAvailable = () => {
    const scrollContainerRef = useRef(null);

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

    return (
        <div>
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
                <PetCard petName="Liza" breedName="persian" />
                <PetCard petName="Liza" breedName="persian" />
                <PetCard petName="Liza" breedName="persian" />
                <PetCard petName="Liza" breedName="persian" />
                <PetCard petName="Liza" breedName="persian" />
                <PetCard petName="Liza" breedName="persian" />
            </div>
        </div>
    );
};

export default PetAvailable;
