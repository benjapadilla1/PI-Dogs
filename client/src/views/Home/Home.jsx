import React from 'react'

import { BgHomeDiv } from '../../styles/styledComponents'

import SearchBar from "../../components/SearchBar/searchBar"
import Pagination from '../../components/Pagination/Pagination'

export default function Home() {
    return (
        <BgHomeDiv>
            <SearchBar />
            <Pagination />
        </BgHomeDiv>
    )
}