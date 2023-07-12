import styled from "styled-components"
import bgLoader from "../assets/dogLoader2.gif"
export const BgDiv = styled.div`
    height: 100vh;
    background-color: #f5f5f5;
    background-image: linear-gradient(to bottom, #79d6c7, #61a5c2);
`
export const BgHomeDiv = styled.div`
    height: 100%;
    background-color: #f5f5f5;
    background-image: linear-gradient(to bottom, #79d6c7, #61a5c2);
`
export const BgLoader = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-image: url(${bgLoader});
    background-repeat: no-repeat;
    background-position: center;
`