import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./backButton.module.css"
export default function BackButton() {
    return (
        <Link to="/home">
            <button className={styles.backButton}>Back</button>
        </Link>
    )
}
