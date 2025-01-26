import React from 'react';
import styles from '../../../styles/home/testimonal.module.css';
const Testimonials = () => {
    return (
        <div>
            <h1 style={{"color":"orange","textAlign":"center"}}>Testimonialss</h1>
            <div className={styles.testimonialsList}>
                <div className={styles.testimonialsCard}>
                    <img src="/static_images/testimonal_image.jpeg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. </p>
                    <span className='testimonalName'>Arnold</span>
                </div>

                <div className={styles.testimonialsCard}>
                    <img src="/static_images/testimonal_image.jpeg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. </p>
                    <span className='testimonalName'>Harry</span>
                </div>

                <div className={styles.testimonialsCard}>
                    <img src="/static_images/testimonal_image.jpeg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur. Sed risus lectus tempus metus. Sed sapien egestas quisque at in eu eu nec. </p>
                    <span className='testimonalName'>Alex</span>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;
