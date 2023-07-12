import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getDogById } from '../../redux/Actions'

import styles from "./Detail.module.css"
import { BgDiv, BgLoader } from '../../styles/styledComponents'
import BackButton from '../../components/utils/BackButton'

export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogById(id))
    }, [dispatch, id])

    const dog = useSelector(state => state.dogById)
    if (dog === null) return <BgLoader />
    const { name, image, life_span, temperament, height, weight } = dog;
    return (
        <BgDiv>
            <div className={styles.container}>
                <BackButton />
                <div className={styles.dogDetails}>
                    <div className={styles.imageContainer}>
                        <img src={image} alt={name} className={styles.image} />
                    </div>
                    <div className={styles.detailsContainer}>
                        <p className={styles.info}>
                            <strong>Id:</strong> {id}
                        </p>
                        <h2 className={styles.name}>Breed: {name}</h2>
                        <p className={styles.info}>
                            <strong>Life Span:</strong> {life_span} years
                        </p>
                        <p className={styles.info}>
                            <strong>Height:</strong> {height} cm.
                        </p>
                        <p className={styles.info}>
                            <strong>Weight:</strong> {weight} kg.
                        </p>
                        <p className={styles.info}>
                            <strong>Temperament:</strong> {temperament}
                        </p>
                    </div>
                </div>
            </div>
        </BgDiv>
    )
}
