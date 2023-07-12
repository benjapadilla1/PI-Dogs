import React, { useState } from 'react'

import styles from './Form.module.css'
import { BgDiv } from '../../styles/styledComponents'

import { useNavigate } from "react-router-dom"

import { useDispatch } from 'react-redux'
import { postDog } from '../../redux/Actions'
import validate from "./helpers/formValidation"

import BackButton from '../../components/utils/BackButton'
import InputField from './helpers/InputField'

export default function CreateDogForm() {
    const dispatch = useDispatch()
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
        const { name, value } = e.target
        setDogData({ ...dogData, [name]: value })
        setErrors(validate({ ...dogData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errors.name && !errors.height && !errors.weight && !errors.image && !errors.temperament && !errors.life_span) {
            alert("You have successfully created a new dog")
            navigate("/home")
            dispatch(postDog(dogData))
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
                        <InputField
                            label="Name"
                            name="name"
                            value={dogData.name}
                            onChange={handleChange}
                            required
                            error={errors.name}
                        />
                        <InputField
                            label="Height"
                            name="height"
                            value={dogData.height}
                            onChange={handleChange}
                            required
                            error={errors.height}
                        />
                        <InputField
                            label="Weight"
                            name="weight"
                            value={dogData.weight}
                            onChange={handleChange}
                            required
                            error={errors.weight}
                        />
                        <InputField
                            label="Temperament"
                            name="temperament"
                            value={dogData.temperament}
                            onChange={handleChange}
                            required
                            error={errors.temperament}
                        />
                        <InputField
                            label="Life Span"
                            name="life_span"
                            value={dogData.life_span}
                            onChange={handleChange}
                            required
                            error={errors.life_span}
                        />
                        <InputField
                            label="Image URL"
                            name="image"
                            value={dogData.image}
                            onChange={handleChange}
                            required
                            error={errors.image}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Create Dog
                    </button>
                </form>
            </BgDiv >
        </>
    )
}
