import React from 'react'
import Card from '../Card/Card'
import styles from "./Cards.module.css"
export default function Cards({ allDogs }) {
    return (
        <div className={styles.divCard}>
            {allDogs.map((dog) => (
                <Card key={dog.id} dog={dog} />
            ))}
        </div>
    )
}
