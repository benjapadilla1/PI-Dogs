import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from '../../redux/Actions'

import Cards from '../Cards/Cards'

import { BgLoader } from '../../styles/styledComponents'
import styles from "./Pagination.module.css"

export default function Pagination() {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const dogPerPage = 8
    const lastIDog = currentPage * dogPerPage
    const firstIDog = lastIDog - dogPerPage

    const allDogs = useSelector(state => state.allDogs)

    // Carga todos los perros al montar el componente, si aún no están cargados
    useEffect(() => {
        !(allDogs.length) && dispatch(getAllDogs())
    }, [])

    const dogShown = allDogs.slice(firstIDog, lastIDog)

    //Se calcula el numero de paginas necesarias  
    const totalPages = Math.ceil(allDogs.length / dogPerPage)

    // Funciones para navegar a la página anterior, siguiente, primera y última
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
