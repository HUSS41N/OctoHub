import React from "react"
import styled from "styled-components"
const PageNotFound = () => {
    return (
        <Page404>
            <h1>404</h1>
            <p>PAGE NOT FOUND</p>
        </Page404>
    )
}

const Page404 = styled.div`
    min-height: 100vh;
    background-color: #4B2142;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
        color: #8CC7A1;
        font-size: 6rem;
        margin: 2rem;
    }
    p{
        color: #97EAD2;
        font-size: 3rem;
    }
`
export default PageNotFound