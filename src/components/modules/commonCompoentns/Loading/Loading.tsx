import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className={styles.loader}></div>
        </div>
    );
};

export default Loading;