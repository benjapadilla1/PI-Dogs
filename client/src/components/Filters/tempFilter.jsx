import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { filterTemp, getAllTemps } from '../../redux/Actions'

import styles from "./Filter.module.css"

export default function TempFilter() {
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
        dispatch(filterTemp(value))
    }

    const handleRecommendation = (e) => {
        let { value } = e.target
        const filteredTemps = allTemps.filter((t) => t.toLowerCase().includes(value.toLowerCase()))
        setRecommendation(filteredTemps)
    }

    const handleRecommendationClick = (recommendation) => {
        setSearchedTemp(recommendation)
        setRecommendation([])
        dispatch(filterTemp(recommendation))
    }
    return (
        <>
            <div className={styles.autocomplete}>
                <input
                    type="text"
                    id='temperImput'
                    value={searchedTemp}
                    onChange={handleFilterByTemp}
                    onInput={handleRecommendation}
                    placeholder='Filter by Temperament...'
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