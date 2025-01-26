import AdoptionProcess from '../components/pages/aboutPage/AdoptionProcess';
import BestOptions from '../components/pages/aboutPage/BestOptions';
import SuccessStories from '../components/pages/aboutPage/SuccessStories';
import styles from '../styles/about/about.module.css';
const About = () => {
    return (
        <div className={styles.about}>
            <BestOptions/>
            <AdoptionProcess/>
            <SuccessStories/>
        </div>
    );
}

export default About;
