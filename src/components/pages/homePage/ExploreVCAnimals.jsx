import { Link } from 'react-router-dom';
import styles from '../../../styles/home/exploreVAAnimals.module.css';

const ExploreVCAnimals = () => {
    return (
        <div className={styles.exploreContainer}>
            <h1 style={{"color":"orange","textAlign":"center"}}>Explore Vast Categories of Animals</h1>

            <div className={styles.exploreCategories}>
                <div className={styles.exploreCategory}>
                    <img src="/static_images/cat.png" alt="" />
                    <p>cats</p>
                </div>
                <div className={styles.exploreCategory}>
                    <img src="/static_images/dog.png" alt="" />
                    <p>dogs</p>
                </div>
                <div className={styles.exploreCategory}>
                    <img src="/static_images/pets.png" alt="" />
                    <p>other Animals</p>
                </div>
            </div>
            <Link to=""><button className='primary-btn'>Explore All Categories <i className="fa-solid fa-arrow-right"></i></button></Link>
        </div>
    );
}

export default ExploreVCAnimals;
