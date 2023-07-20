import React from 'react'
import styles from "./Card.module.css"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { deleteDog } from '../../redux/Actions'
import { DeleteButton } from '../../styles/styledComponents'
import svgIcon from "../../assets/trashIcon.svg"
export default function Card({ dog }) {
    const { id, name, image, temperament, weight } = dog
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(deleteDog(id))
    }
    return (
        <div className={styles.card}>
            <Link to={`/detail/${id}`}>
                <div className={styles.imageContainer}>
                    <img src={image} alt={name} className={styles.image} />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.temperament}>Temperaments: {temperament}</p>
                    <p className={styles.weight}>Weight: {weight} kg.</p>
                </div>
            </Link>
            {
                isNaN(id)
                    ? <DeleteButton onClick={handleClick} ><img src={svgIcon} alt="DeleteTrash" /></DeleteButton>
                    : null
            }
        </div>
    );
}