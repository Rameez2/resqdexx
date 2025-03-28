import React, { useState } from 'react';
import styles from '../../../styles/petDetails.module.css';
import { storage } from '../../../api/appwrite';

const PetImages = ({pet}) => {
    const images = [
        pet.main_image,
        ...(pet.images || [])
        // "/static_images/about-cat.jpeg",
        // "/static_images/learn1.jpeg"
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className={styles.imagesContainer}>
            <div className={styles.mainImage}>
                <div className={styles.arrowBtn}>
                    <button onClick={handlePrev}><i className="fa-solid fa-chevron-left"></i></button>
                </div>
                <div className={styles.arrowBtn}>
                    <button onClick={handleNext}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
                <img src={ storage.getFileView('6799fb94000edc47b27d', images[currentIndex])} alt="Selected Pet" />
                {/* <img src={images[currentIndex]} alt="Selected Pet" /> */}
                
            </div>
            <div className={styles.imageList}>
                {images.map((img, index) => (
                    <img style={{"cursor":"pointer"}}
                        key={index} 
                        src={ storage.getFileView('6799fb94000edc47b27d', img)}
                        alt={`Pet ${index + 1}`} 
                        onClick={() => setCurrentIndex(index)} 
                        className={styles.thumbnail}
                    />
                ))}
            </div>
        </div>
    );
}

export default PetImages;


        // const images = [
        //     "/static_images/success-cat.jpeg",
        //     "/static_images/about-cat.jpeg",
        //     "/static_images/learn1.jpeg"
        // ];