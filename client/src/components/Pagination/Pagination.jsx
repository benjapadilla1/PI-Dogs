import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from '../../redux/Actions'

import Cards from '../Cards/Cards'

import { BgLoader } from '../../styles/styledComponents'
import styles from "./Pagination.module.css"

export default function Pagination() {
    const [currentPage, setCurrentPage] = useState(1)
    const dogPerPage = 8
    const lastIDog = currentPage * dogPerPage
    const firstIDog = lastIDog - dogPerPage

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])

    const allDogs = useSelector(state => state.allDogs)
    const dogShown = allDogs.slice(firstIDog, lastIDog)
    if (!allDogs.length) return <BgLoader />
    const goPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const goNext = () => {
        const totalPages = Math.ceil(allDogs.length / dogPerPage)
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <>
            <Cards allDogs={dogShown} />
            <div className={styles.navButtons}>
                <button onClick={goPrev}>Prev</button>
                <p>{currentPage}</p>
                <button onClick={goNext}>Next</button>
            </div>
        </>
    )
}
