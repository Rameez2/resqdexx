import styles from './loader1.module.css';
const Loader1 = () => {
    return (
        <div class={styles.loader}>
            <div class={styles.wrapper}>
                <div class={styles.text}>LOADING</div>
                <div class={styles.box}></div>
            </div>
        </div>

    );
}

export default Loader1;
