import React, { useState } from 'react'

import styles from './Form.module.css'
import { BgForm } from '../../styles/styledComponents'

import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, postDog } from '../../redux/Actions'
import validate from "./helpers/formValidation"

import BackButton from '../../components/utils/BackButton'
import InputField from './helpers/InputField'
import TemperamentField from './helpers/temperamentField'

export default function CreateDogForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTemps = useSelector(state => state.allTemps)

    const [dogData, setDogData] = useState({
        name: '',
        height: '',
        weight: '',
        image: '',
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

    // rastrear si se ha interactuado con los inputs
    const [interacted, setInteracted] = useState(false)

    const [selectedTemps, setSelectedTemps] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target
        setDogData({ ...dogData, [name]: value })
        setInteracted(true)
        // Validar los datos actualizados del formulario y los temperamentos seleccionados
        setErrors(validate({ ...dogData, [name]: value }, selectedTemps))
    }
    const handleTempChange = (temp) => {
        // Verificar si el temperamento ya existe en el array de temperamentos seleccionados
        setSelectedTemps(temp)
        setErrors(validate(dogData, temp))
    }

    // Variable para determinar el cursor y el bgc el botón de envío del formulario
    const showButton = interacted && Object.values(errors).every((error) => !error)

    // Mapear los temperamentos seleccionados a los índices correspondientes en el array allTemps
    const mappedTemps = selectedTemps.map((temp) => {
        return allTemps.indexOf(temp) + 1
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        // Crear el objeto dog con los datos del formulario y los temperamentos seleccionados
        const dog = {
            ...dogData,
            temperament: mappedTemps
        }
        dispatch(postDog(dog))
            .then(() => {
                console.log(dogData)
                alert("You have successfully created a new dog")
                navigate("/home")
                dispatch(getAllDogs())
            })
            .catch(() => {
                alert(`The dog with the name ${dogData.name} already exists`)
            })
    }
    return (
        <BgForm>
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
                        placeholder="Name of the dog"
                    />
                    <InputField
                        label="Height"
                        name="height"
                        value={dogData.height}
                        onChange={handleChange}
                        required
                        error={errors.height}
                        placeholder="Height specified in min - max (cm.)"
                    />
                    <InputField
                        label="Weight"
                        name="weight"
                        value={dogData.weight}
                        onChange={handleChange}
                        required
                        error={errors.weight}
                        placeholder="Weight specified in min - max (kg.)"
                    />
                    <InputField
                        label="Life Span"
                        name="life_span"
                        value={dogData.life_span}
                        onChange={handleChange}
                        required
                        error={errors.life_span}
                        placeholder="Life Span specified in min - max (years)"
                    />
                    <InputField
                        label="Image URL"
                        name="image"
                        value={dogData.image}
                        onChange={handleChange}
                        required
                        error={errors.image}
                        placeholder="URL of the dog"
                    />
                    <TemperamentField
                        selectedTemps={selectedTemps}
                        onChange={handleTempChange}
                        error={errors.temperament}
                    />
                </div>
                <button type="submit"
                    className={styles.button}
                    style={{ cursor: !showButton ? "not-allowed" : "pointer", backgroundColor: !showButton ? "grey" : 'green' }}
                    disabled={!showButton}
                >
                    Create Dog
                </button>
            </form>
        </BgForm >
    )
}
