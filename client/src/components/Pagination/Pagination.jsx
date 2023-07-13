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

    const totalPages = Math.ceil(allDogs.length / dogPerPage)

    function goFirst() {
        if (currentPage > 1) {
            setCurrentPage(1)
        }
    }
    function goPrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function goNext() {
        const totalPages = Math.ceil(allDogs.length / dogPerPage)
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    function goLast() {
        if (totalPages) {
            setCurrentPage(totalPages)
        }
    }
    if (!allDogs.length) return <BgLoader />
    return (
        <>
            <div className={styles.navButtons}>
                <button onClick={goPrev} className={styles.button}>Prev</button>
                <p className={styles.currentPage}>{currentPage}</p>
                <button onClick={goNext} className={styles.button}>Next</button>
            </div>
            <Cards allDogs={dogShown} />
            <div className={styles.navButtons}>
                {currentPage === 1 ? null
                    : <button onClick={goFirst} className={styles.button}>First</button>
                }
                {currentPage === totalPages ? null
                    : <button onClick={goLast} className={styles.button}>Last</button>
                }
            </div >
        </>
    )
}
