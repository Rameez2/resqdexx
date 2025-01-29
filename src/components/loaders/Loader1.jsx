import styles from './loader1.module.css';
const Loader1 = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.wrapper}>
                <div className={styles.text}>LOADING</div>
                <div className={styles.box}></div>
            </div>
        </div>

    );
}

export default Loader1;
