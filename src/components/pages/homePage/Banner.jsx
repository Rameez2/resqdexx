import React from 'react';
import styles from '../../../styles/home/banner.module.css';

const Banner = () => {
    return (
        <div className={styles.bannerSection}>
            <div className={styles.bannerText}>
                <h1>Find Your Perfect Companion Today!</h1>
                <p>Connecting animal lovers with rescue organizations to give pets a second chance at life.</p>
            </div>
            <div className={styles.bannerSearch}>
                <div className={styles.animalOptions}>
                    <span>Cats</span>
                    <span>Dogs</span>
                    <span>Others</span>
                </div>
                <form className={styles.searchInputs}>
                    <input type="text" name='breed' placeholder='Breed' />
                    <input type="number" name='age' placeholder='Age' />
                    <input type="text" name='location' placeholder='Location' />
                    <button type='submit' className='primary-btn'><i class="fa-solid fa-magnifying-glass"></i> Find Pet</button>
                </form>
            </div>
        </div>
    );
}

export default Banner;
