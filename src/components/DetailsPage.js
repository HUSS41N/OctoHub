import React,{useContext} from "react"
import UserContext from "../context/UserContext"
import logo from "../logo/Octocat.png"
import styled  from "styled-components"
const DetailsPage = () => {
    const context = useContext(UserContext);
    return (
        <DetailsDiv>
            <img src={logo} alt="placeholder"/>
            <h1>{context.user.data.login}</h1>
            <a href="/">@HUSS41N</a>
            <div>
                <p>Delhi</p>
                <p>Joined July 7, 2020</p>
            </div>
        </DetailsDiv>
    )
}

const DetailsDiv = styled.div`
    min-height: 90vh;
    background-color: #74226C;
    display: flex;
    flex-direction: column;
    padding: 5rem;
    /* justify-content: center; */
    align-items: center;
    a{
        font-size: 3rem;
        margin: 1.5rem;
        color: #816E94;
        text-decoration: none;
    }
    img{
        width: 300px;
    }
    h1{
        color: #8CC7A1;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 6rem;
    }
    div {
        display: flex;
        font-size: 2rem;
        color: #97EAD2;
    }
    div p {
        margin-left: 2rem;
    }
    `
export default DetailsPage;