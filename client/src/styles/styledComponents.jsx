import styled from "styled-components"
import bgLoader from "../assets/dogLoader2.gif"
import bg from "../assets/bg.webp"
import bgDetail from "../assets/bgDetail.webp"
import bgForm from "../assets/bgForm.jpg"

export const BgForm = styled.div`
    height: 100vh;
    background-color: #f5f5f5;
    background-image: url(${bgForm});
`
export const BgHomeDiv = styled.div`
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
`
export const BgDetailDiv = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: url(${bgDetail});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center bottom;   
`;

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

export const DeleteButton = styled.button`
    border: none;
    cursor: pointer;
    margin-top: 10px;
    img{
        padding: 10px;
    }
    img:hover {
    background-color: #ff0000;
    }
`