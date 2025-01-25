import React from 'react';
import styles from '../styles/banner.module.css';

const Banner = () => {
    return (
        <div className={styles.bannerSection}>
            <div className={styles.bannerText}>
                <h1>Find Your Perfect Companion Today!</h1>
                <p>Connecting animal lovers with rescue organizations to give pets a second chance at life.</p>
            </div>
            <div className={styles.bannerSearch}>
                <input type="text" placeholder='Search' />
            </div>
        </div>
    );
}

export default Banner;
