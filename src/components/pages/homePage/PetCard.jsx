import styles from '../../../styles/petCard.module.css'

const PetCard = ({petName,breedName}) => {
    return (
        <div className={styles.petBox}>
            <i class={`${styles.heartIcon} fa-regular fa-heart`}></i>
            <div className={styles.petImage}>
                <img src="https://s3-alpha-sig.figma.com/img/ea30/0021/c283d7591d79a6c71feb2a67a67f89bc?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q6x8HKadmCiC5Zn~45-ouyQzpn8nsgjYGaw5QNSg43N5dXRGTBwHA~oEAQUTbQY6CPayNcKwTIMDyJXscl17KqILGzVNYmnWjwB8B-Bb-GDW85~XbCWP9OeZFLHOqOQQENt9oxO7q~LbEu-1hvtrJZIHhUtLJlTQoHsSLVEXIE3O2g~Uo3vbMXnPymMNBIwxtfz1adnwF3A~DbBHuyNskieir68SLQEx3SO-R7LGYaC-WD9kmql99wKZ0~X2CXZ7OQJEGW~jD1n3Y9B5uHPGb34WvS-3ZkC2RoXhX5AVEDJ835V1BpTJAPfNmTqCYjn376~RlDcDbpDmdw-fFB8vHQ__" alt="" />
            </div>
            <div className={styles.petData}>
            <div>
                <h2>{petName}</h2>
                <p>{breedName}</p>
            </div>
            <div className="btn">
                <i class={`${styles.arrowIcon} fa-solid fa-arrow-right`}></i>
            </div>
            </div>
        </div>
    );
}

export default PetCard;
