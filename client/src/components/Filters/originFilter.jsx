import React from 'react'

import { useDispatch } from "react-redux"
import { filterOrigin, } from '../../redux/Actions'

import styles from "./Filter.module.css"

export default function OriginFilter() {
    const dispatch = useDispatch()
    const handleOrigin = (e) => {
        dispatch(filterOrigin(e.target.value))
    }
    return (
        <>
            <select
                name="filterOrigin"
                onChange={handleOrigin}
                defaultValue=""
                className={styles.selectBar}
            >
                <option label="Origin" value="" disabled>
                </option>
                <option value="DB">Data Base</option>
                <option value="API">API</option>
            </select>
        </>
    )
}
