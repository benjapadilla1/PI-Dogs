import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { getAllTemps, filterTemp } from '../../../redux/Actions'

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

    useEffect(() => {
        dispatch(getAllTemps())
    }, [dispatch])

    const handleFilterByTemp = (e) => {
        let { value } = e.target
        setSearchedTemp(value)
    }

    const handleRecommendation = (e) => {
        let { value } = e.target
        const filteredTemps = allTemps.filter((t) => t.toLowerCase().includes(value.toLowerCase()))
        setRecommendation(filteredTemps)
    }

    const handleRecommendationClick = (recommendation) => {
        const updatedTemps = [...selectedTemps, recommendation]
        onChange(updatedTemps)
        setSearchedTemp("")
        setRecommendation([])
        dispatch(filterTemp(recommendation))
        console.log(selectedTemps)
    }
    return (
        <>
            <div className={styles.autocomplete}>
                <label className={styles.label} >Temperaments:
                    <input
                        type="text"
                        id='temperImput'
                        value={searchedTemp}
                        onChange={handleFilterByTemp}
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
                                {temp} <button type='button'>&#10006;</button>
                            </span>
                        ))}
                        {error && <ErrorMessage message={error} />}
                    </div>
                </label>
            </div>
        </>
    )
}

function clickOutside(ref, handler) {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler()
            }
        }
        document.addEventListener("click", handleClickOutside)
    }, [ref, handler])
}