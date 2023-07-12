import React, { useState } from 'react'

import styles from './Form.module.css'
import { BgDiv } from '../../styles/styledComponents'

import { useNavigate } from "react-router-dom"

import validate from "./formValidation"
import BackButton from '../../components/utils/BackButton'

export default function CreateDogForm() {
    const navigate = useNavigate()
    const [dogData, setDogData] = useState({
        name: '',
        height: '',
        weight: '',
        image: '',
        temperament: '',
        life_span: '',
    })
    const [errors, setErrors] = useState({
        name: '',
        height: '',
        weight: '',
        image: '',
        temperament: '',
        life_span: '',
    })

    const handleChange = (e) => {
        setDogData({ ...dogData, [e.target.name]: e.target.value })
        setErrors(validate({ ...dogData, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errors.name && !errors.height && !errors.weight && !errors.image && !errors.temperament && !errors.life_span) {
            alert("You have successfully created a new dog")
            navigate("/home")
        } else {
            alert("Incorrect Data")
        }
    }

    return (
        <>
            <BgDiv>
                <BackButton />
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Create Dog</h2>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={dogData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                        </label>
                        <label className={styles.label}>
                            Height:
                            <input
                                type="text"
                                name="height"
                                value={dogData.height}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                            {errors.height && <p className={styles.error}>{errors.height}</p>}
                        </label>
                        <label className={styles.label}>
                            Weight:
                            <input
                                type="text"
                                name="weight"
                                value={dogData.weight}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                            {errors.weight && <p className={styles.error}>{errors.weight}</p>}
                        </label>

                        <label className={styles.label}>
                            Temperament:
                            <input
                                type="text"
                                name="temperament"
                                value={dogData.temperament}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                            {errors.temperament && (
                                <p className={styles.error}>{errors.temperament}</p>
                            )}
                        </label>
                        <label className={styles.label}>
                            Life Span:
                            <input
                                type="text"
                                name="life_span"
                                value={dogData.life_span}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                            {errors.life_span && <p className={styles.error}>{errors.life_span}</p>}
                        </label>
                        <label className={styles.label}>
                            Image URL:
                            <input
                                type="text"
                                name="image"
                                value={dogData.image}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                            {errors.image && <p className={styles.error}>{errors.image}</p>}
                        </label>
                    </div>
                    <button type="submit" className={styles.button}>
                        Create Dog
                    </button>
                </form>
            </BgDiv >
        </>
    )
}
