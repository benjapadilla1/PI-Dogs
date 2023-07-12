import React from 'react';
import styles from './Error.module.css';
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div className={styles.container}>
            <div className={styles.background} />
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
                <p className={styles.dialog}>But don't worry, there are plenty of adorable dogs to explore!</p>
                <Link to={"/"}>
                    <button className={styles.button}>Back to Homepage</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;
