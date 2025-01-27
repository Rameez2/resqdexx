import styles from '../../../styles/petCard.module.css'

const PetCard = ({petName,breedName}) => {
    return (
        <div className={styles.petBox}>
            <i className={`${styles.heartIcon} fa-regular fa-heart`}></i>
            <div className={styles.petImage}>
                <img src="/static_images/card-dog.jpeg" alt="" />
            </div>
            <div className={styles.petData}>
            <div>
                <h2>{petName}</h2>
                <p>{breedName}</p>
            </div>
            <div className="btn">
                <i className={`${styles.arrowIcon} fa-solid fa-arrow-right`}></i>
            </div>
            </div>
        </div>
    );
}

export default PetCard;
