import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { getDogByName, resetFilters } from '../../redux/Actions'

import styles from "./searchBar.module.css"

import OriginFilter from "../Filters/originFilter"
import Orders from "../Filters/Orders"
import TempFilter from "../Filters/tempFilter"

export default function searchBar() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")

    const handleChange = (e) => {
        if (!/\d/.test(e.target.value)) { //no permite ingreso de numeros
            setSearch(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDogByName(search))
        setSearch("")
    }
    const handleReset = () => {
        dispatch(resetFilters())
    }
    return (
        <>
            <div className={styles.divFilters} >
                <Orders />
                <OriginFilter />
                <TempFilter />
            </div >
            <div className={styles.divButtons}>
                <Link to={"/create"}>
                    <button className={styles.createButton}>Create</button>
                </Link>
                <button className={styles.resetButton} onClick={handleReset}>Reset Filters</button>
            </div >
            <form className={styles.searchBarContainer} onSubmit={handleSubmit} >
                <div className={styles.searchBar} >
                    <input
                        className={styles.input}
                        type="search"
                        placeholder="Search by breed name..."
                        name="search"
                        value={search}
                        onChange={handleChange}
                    />
                    <button className={styles.searchButton} type="submit">Search</button>
                </div>
            </form>
        </ >
    )
}
