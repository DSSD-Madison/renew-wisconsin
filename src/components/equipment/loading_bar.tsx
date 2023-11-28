import React from 'react';
import styles from './LoadingBar.module.css'; // Import the CSS module for styling

const LoadingSpinner = () => {
    return (
        <div className={styles['loading-spinner-container']}>
            <div className={styles['loading-spinner']}></div>
        </div>
    );
};

export default LoadingSpinner;