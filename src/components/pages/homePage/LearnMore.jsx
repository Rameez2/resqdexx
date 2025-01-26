import React from 'react';
import styles from '../../../styles/home/learnMore.module.css'

const LearnMore = () => {
    return (
        <div className={styles.learnmore}>
            <div className={styles.leftSide}>
                <h1>All About ResQDexx</h1>
                <p>Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. Justo donec aliquet bibendum felis odio laoreet fermentum libero sed. Est pharetra eu at nibh adipiscing erat hac. Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. Justo donec aliquet bibendum felis odio laoreet fermentum libero sed. Est pharetra eu at nibh adipiscing erat hac.</p>
                <button className='primary-btn'>Learn More</button>
            </div>
            <div className={styles.rightSide}>
                <img src="/static_images/learn1.jpeg" alt="" />
                <img src="/static_images/learn2.jpeg" alt="" />
                <img src="/static_images/learn3.jpeg" alt="" />
                <img src="/static_images/learn4.jpeg" alt="" />
            </div>
        </div>
    );
}

export default LearnMore;
