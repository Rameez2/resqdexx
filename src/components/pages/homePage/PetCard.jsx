import { Link } from 'react-router-dom';
import styles from '../../../styles/petCard.module.css'
import { updateFavourites } from '../../../api/userApi';
import { storage } from '../../../api/appwrite';

const PetCard = ({petName,breedName,petId,isFav,imageId}) => {
    return (
        <div className={styles.petBox}>
            {isFav ? <i onClick={() => updateFavourites(petId)} className={`${styles.heartIcon} fa-regular fa-heart`}></i> : <i onClick={() => updateFavourites(petId)} className={`${styles.heartIcon} fa-regular fa-heart`}></i>}
            {/* <i onClick={() => updateFavourites(petId)} className={`${styles.heartIcon} fa-regular fa-heart`}></i> */}
            <div className={styles.petImage}>
                <img src={storage.getFileView('6799fb94000edc47b27d', imageId)} alt="" />
            </div>
            <div className={styles.petData}>
            <div>
                <h2>{petName}</h2>
                <p>{breedName}</p>
            </div>
            <Link to={`/pet-details/${petId}`}>
            <div className="btn">
                <i className={`${styles.arrowIcon} fa-solid fa-arrow-right`}></i>
            </div>
            </Link>
            </div>
        </div>
    );
}

export default PetCard;
