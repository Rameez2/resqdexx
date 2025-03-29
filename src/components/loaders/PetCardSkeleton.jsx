import styles from './petCardSkeleton.module.css';

const PetCardSkeleton = () => {
    return (
        <div className={styles.petBox}>
            {/* {isFav ? <i onClick={() => updateFavourites(petId)} className={`${styles.heartIcon} fa-regular fa-heart`}></i> : <i onClick={() => updateFavourites(petId)} className={`${styles.heartIcon} fa-regular fa-heart`}></i>} */}
            <i className={`${styles.heartIcon} fa-regular fa-heart`}></i>
            <div className={styles.petImage}>
                <img alt="" />
            </div>
            <div className={styles.petData}>
            <div>
                <h2></h2>
                <p></p>
            </div>
            <div className="btn">
                <i className={`${styles.arrowIcon} fa-solid fa-arrow-right`}></i>
            </div>
            </div>
        </div>
    );
}

export default PetCardSkeleton;
