import React from 'react';
import { Link } from 'react-router-dom';
import dogImage from "../../assets/dogLanding.jpg";
import styles from "./Landing.module.css";
export default function Landing() {
    return (
        <div className={styles.container}>
            <img src={dogImage} alt="Dogs" className={styles.image} />
            <h1 className={styles.title}>Welcome to Doggy World!</h1>
            <p className={styles.subtitle}>Find your best friend.</p>
            <Link to="/home">
                <button className={styles.button}>Explore Dogs</button>
            </Link>
        </div>
    );
}
