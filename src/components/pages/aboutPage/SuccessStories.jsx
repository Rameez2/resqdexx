import styles from '../../../styles/about/successStories.module.css';

const SuccessStories = () => {
    return (
        <div className={styles.SuccessStories}>
            <p style={{ color: "orange", textAlign: "end" }}>Success Stories</p>
            <h1 style={{ margin: "0", textAlign: "end" }}>Uniting Pets</h1>
            <div className={styles.scrollIcons}>
                <i className={`${styles.arrowIcon} arrow-icon fa-solid fa-arrow-left`}></i>
                <i className={`${styles.arrowIcon} arrow-icon fa-solid fa-arrow-right`}></i>
            </div>
            <div className={styles.storiesList}>
                <div className={styles.storyContainer}>
                    <div className={styles.storyImage}>
                        <img src="/static_images/success-cat.jpeg" alt="" />
                    </div>
                    <div className={styles.storyContent}>
                        <h1>Max’s Story:</h1>
                        <p>Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus.
                        Sed sapien egestas quisque at in eu eu nec. Justo donec aliquet bibendum felis odio laoreet
                        fermentum libero sed. Est pharetra eu at nibh adipiscing erat hac. Lorem ipsum dolor sit amet consectetur.
                        Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessStories;
