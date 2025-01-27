import { Link } from 'react-router-dom';
import styles from '../styles/footer.module.css';

const Footer = () => {
    return (
        <footer>
            <div className={styles.footerTop}>
                <div className="footerLogo">
                    <img src="/static_images/dummy-logo-5b.webp" alt="" />
                </div>
                <div className={styles.footerContent}>
                    <div className={styles.footerInfo}>
                        <h5>INFO</h5>
                        <Link to=""> Cats </Link>
                        <Link to=""> Dogs </Link>
                        <Link to=""> Other Pets </Link>
                        <Link to=""> join as other organizations </Link>
                    </div>
                    <div className={styles.footerAbout}>
                        <h5>ABOUT</h5>
                        <Link to=""> Blog </Link>
                        <Link to=""> About Us </Link>
                    </div>
                    <div className={styles.footerContact}>
                        <h5>CONTACT</h5>
                        <Link to="">1901 Thornridge Cir. Shiloh,Hawaii 81063</Link>
                        <Link to="">+1 891 989-11-91</Link>
                        <Link to="">hello@logoipsum.com</Link>

                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div>
                    <p>
                        © 2023 — Copyright
                    </p>
                </div>
                <div className={styles.footerSocial}>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-facebook"></i>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
