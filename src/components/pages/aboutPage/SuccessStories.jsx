import React, { useState } from 'react';
import styles from '../../../styles/about/successStories.module.css';

const SuccessStories = () => {
    const stories = [
        {
            image: "/static_images/success-cat.jpeg",
            title: "Max’s Story 1",
            content: "Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. Justo donec aliquet bibendum felis odio laoreet fermentum libero sed. Est pharetra eu at nibh adipiscing erat hac."
        },
        {
            image: "/static_images/success-cat.jpeg",
            title: "Max’s Story 2",
            content: "Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. Justo donec aliquet bibendum felis odio laoreet fermentum libero sed. Est pharetra eu at nibh adipiscing erat hac."
        },
        {
            image: "/static_images/success-cat.jpeg",
            title: "Max’s Story 3",
            content: "Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. Justo donec aliquet bibendum felis odio laoreet fermentum libero sed. Est pharetra eu at nibh adipiscing erat hac."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? stories.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === stories.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className={styles.SuccessStories}>
            <p style={{ color: "orange", textAlign: "end" }}>Success Stories</p>
            <h1 style={{ margin: "0", textAlign: "end" }}>Uniting Pets</h1>
            
            <div className={styles.scrollIcons}>
                <i className={`${styles.arrowIcon} arrow-icon fa-solid fa-arrow-left`} onClick={handlePrev}></i>
                <i className={`${styles.arrowIcon} arrow-icon fa-solid fa-arrow-right`} onClick={handleNext}></i>
            </div>

            <div className={styles.storiesList}>
                <div className={styles.storyContainer}>
                    <div className={styles.storyImage}>
                        <img src={stories[currentIndex].image} alt={stories[currentIndex].title} />
                    </div>
                    <div className={styles.storyContent}>
                        <h1>{stories[currentIndex].title}</h1>
                        <p>{stories[currentIndex].content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessStories;
