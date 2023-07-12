import React from 'react'
import styles from "./Card.module.css"
import { Link } from "react-router-dom"
export default function Card({ dog }) {
    const { name, image, temperament, weight } = dog
    return (
        <div className={styles.card}>
            <Link to={`/detail/${dog.id}`}>
                <div className={styles.imageContainer}>
                    <img src={image} alt={name} className={styles.image} />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.temperament}>Temperaments: {temperament}</p>
                    <p className={styles.weight}>Weight: {weight} kg.</p>
                </div>
            </Link>
        </div>
    );
}