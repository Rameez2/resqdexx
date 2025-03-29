import styles from '../styles/contact-us/contactus.module.css';


const ContactUs = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bannerContainer}>
                <h1>Contact Us</h1>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.infoContainer}>
                    <h1>Let's talk with us</h1>
                    <p>Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly.</p>

                    <div className={styles.infoGroup}>
                        <i class="fa-solid fa-location-dot"></i>
                        <span>1055 Arthur ave Elk Groot, 67.
                        New Palmas South Carolina.</span>
                    </div>
                    <div className={styles.infoGroup}>
                        <i class="fa-solid fa-phone"></i>
                        <span>+1 234 678 9108 99</span>
                    </div>
                    <div className={styles.infoGroup}>
                        <i class="fa-solid fa-envelope"></i>
                        <span>Contact@reqdexx.com</span>
                    </div>
                </div>

                <form className={styles.contactForm}>
                    <div className={styles.namesDiv}>
                        <input className={styles.formInput} type="text" name="" id="" placeholder='First Name*' />
                        <input className={styles.formInput} type="text" name="" id="" placeholder='Last Name*' />
                    </div>
                    <input className={styles.formInput} type="email" name="" id="" placeholder='Email*' />
                    <input className={styles.formInput} type="tel" name="" id="" placeholder='Phone No*' />
                    <textarea name="message" id="" placeholder='Your message...'></textarea>
                    <button className='primary-btn'>Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
