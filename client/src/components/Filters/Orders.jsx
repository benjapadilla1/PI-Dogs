import React from 'react'

import { orderByWeight, orderByName, } from '../../redux/Actions'
import { useDispatch } from "react-redux"

import styles from "./Filter.module.css"


export default function Orders() {
    const dispatch = useDispatch()
    const handleOrderChange = (e) => {
        const { value } = e.target
        if (value === "A" || value === "B") {
            dispatch(orderByName(value))
        } else if (value === "C" || value === "D") {
            dispatch(orderByWeight(value))
        }
    }
    return (
        <>
            <select name="order" onChange={handleOrderChange} defaultValue="" className={styles.selectBar}>
                <option value="" disabled>Order by</option>
                <optgroup label="Name" >
                    <option value="A">A-Z</option>
                    <option value="B">Z-A</option>
                </optgroup>
                <optgroup label="Weight">
                    <option value="C">Ascendant</option>
                    <option value="D">Descendant</option>
                </optgroup>
            </select>
        </>
    )
}