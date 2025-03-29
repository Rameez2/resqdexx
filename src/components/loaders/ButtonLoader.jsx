import styles from './buttonLoader.module.css';

const ButtonLoader = ({loaderSize}) => {
    return (
        <div className={styles.loader} style={{width:`${loaderSize}px`,height:`${loaderSize}px`}}></div>
    );
}

export default ButtonLoader;