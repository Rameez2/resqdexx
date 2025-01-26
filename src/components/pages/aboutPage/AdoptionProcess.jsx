import styles from '../../../styles/about/adoption.module.css';
const AdoptionProcess = () => {
    return (
        <div>
            <p style={{color:"orange"}}>Adoption Process</p>
            <h1>Easier Adoption Process</h1>
            <div className={styles.adoptionCards}>
                <div className={styles.adoptCard}>
                    {/* <img src="" alt="" /> */}
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>Search and Filter</h3>
                    <p>Narrow down options based on animal category, breed, age, size, temperament, and location.</p>
                </div>
                <div className={styles.adoptCard}>
                    {/* <img src="" alt="" /> */}
                    <i class="fa-brands fa-connectdevelop"></i>
                    <h3>Connect with Rescues</h3>
                    <p>Directly contact the rescue organization or shelter for further inquiries and next steps.</p>
                </div>
                <div className={styles.adoptCard}>
                    {/* <img src="" alt="" /> */}
                    <i class="fa-regular fa-user"></i>
                    <h3>Review Profiles</h3>
                    <p>Access comprehensive details about each pet, including photos, videos, and a heartfelt bio.</p>
                </div>
            </div>
        </div>
    );
}

export default AdoptionProcess;
