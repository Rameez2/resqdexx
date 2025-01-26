import styles from '../../../styles/about/bestOptions.module.css';
const BestOptions = () => {
    return (
        <div className={styles.bestOptions}>
            <div className={styles.aboutImages}>
                <img src="/static_images/about-dog.jpeg" alt="" />                
                <img src="/static_images/about-cat.jpeg" alt="" />                
            </div>
            <div className={styles.bestContent}>
                <p style={{color:"orange"}}>About</p>
                <h1>Best Option For Adoption</h1>
                <p>Our mission is to simplify the adoption process, raise awareness about animal rescue, and create loving forever homes for animals worldwide</p>
                <div className={styles.bestOpt}>
                    <span><i class="fa-solid fa-check"></i> Hassle</span>
                    <span><i class="fa-solid fa-check"></i> Home Delivery</span>
                    <span><i class="fa-solid fa-check"></i> Tailored Choices</span>
                    <span><i class="fa-solid fa-check"></i> World Wide</span>
                </div>
            </div>  
        </div>
    );
}

export default BestOptions;
