import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getDogById } from '../../redux/Actions'

import styles from "./Detail.module.css"
import { BgDetailDiv, BgLoader } from '../../styles/styledComponents'
import BackButton from '../../components/utils/BackButton'

export default function Detail() {
    // Estado local para del estado de carga del perro
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        //Obtener el detalle del perro mediante la id del params
        dispatch(getDogById(id))
            .then(() => setLoading(false)) // Una vez que la acción se completa, cambiar el estado de loading a false
    }, [])

    const dog = useSelector(state => state.dogById)
    if (loading) return <BgLoader />
    const { name, image, life_span, temperament, height, weight } = dog;
    return (
        <BgDetailDiv>
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
                        <p className={styles.info}>
                            <strong>Breed: </strong> {name}
                        </p>
                        <p className={styles.info}>
                            <strong>Life Span:</strong> {life_span}
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
        </BgDetailDiv>
    )
}
