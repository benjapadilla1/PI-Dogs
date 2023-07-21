import React, { useEffect, useRef, useState } from 'react'

import { clickOutside } from '../../../components/Filters/tempFilter'

import { useDispatch, useSelector } from "react-redux"
import { getAllTemps } from '../../../redux/Actions'

import styles from "../Form.module.css"
import ErrorMessage from './ErrorMessage'
export default function TemperamentField({ selectedTemps, onChange, error }) {
    const [searchedTemp, setSearchedTemp] = useState("")
    const [recommendation, setRecommendation] = useState([])

    //logica de clickeo afuera de la ul
    const ulRef = useRef(null)
    clickOutside(ulRef, () => setRecommendation([]));

    const dispatch = useDispatch()
    const allTemps = useSelector(state => state.allTemps)

    // Cargar los temperamentos al cargar el componente
    useEffect(() => {
        dispatch(getAllTemps())
    }, [dispatch])

    const handleChange = (e) => {
        let { value } = e.target
        setSearchedTemp(value)
    }

    // Manejar el click en una recomendación para agregarla a los temperamentos seleccionados
    const handleRecommendation = (e) => {
        let { value } = e.target
        const filteredTemps = allTemps.filter((t) => t.toLowerCase().includes(value.toLowerCase()))
        setRecommendation(filteredTemps)
    }

    const handleRecommendationClick = (recommendation) => {
        const exists = selectedTemps.includes(recommendation)
        if (!exists) {
            const updatedTemps = [...selectedTemps, recommendation]
            onChange(updatedTemps)
            setSearchedTemp("")
            setRecommendation([])
        } else {
            alert("Temperament repeated")
        }
    }
    //Funcion para borrar el temperamento agregado
    const handleRemove = (temp) => {
        const updatedTemps = selectedTemps.filter((t) => t !== temp)
        onChange(updatedTemps)
    }
    return (
        <>
            <div className={styles.autocomplete}>
                <label className={styles.label} >Temperaments:
                    <input
                        type="text"
                        id='temperImput'
                        value={searchedTemp}
                        onChange={handleChange}
                        onInput={handleRecommendation}
                        placeholder='Temperament search...'
                        className={styles.inputFilter}
                        autoComplete='off'
                    />
                    {recommendation.length > 0 && (
                        <ul className={styles.recommendations} ref={ulRef} >
                            {recommendation
                                .sort((a, b) => a.localeCompare(b))
                                .map((temp) => (
                                    <li
                                        key={temp}
                                        onClick={() => handleRecommendationClick(temp)}
                                        className={styles.list}
                                    >
                                        {temp}?
                                    </li>
                                ))}
                        </ul>
                    )}
                    <div>
                        {selectedTemps.map((temp, i) => (
                            <span key={i}>
                                {i > 0 && ", "}
                                {temp} <button type='button' style={{ backgroundColor: "red", cursor: "pointer" }} onClick={() => handleRemove(temp)} >&#10006;</button>
                            </span>
                        ))}
                        {error && <ErrorMessage message={error} />}
                    </div>
                </label>
            </div>
        </>
    )
}