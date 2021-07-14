import React,{useState} from "react";
import Axios from "axios";
import logo from "../logo/Octocat.png"
import styled  from "styled-components";
import { Redirect } from "react-router";
const Search = () => {
    const [username,setUsername] = useState("");
    const [userData,setUserData] = useState(null);

    const apiHandler = async() => {
        try {
            const { data } = await Axios.get(`https://api.github.com/users/${username}`);
            setUserData(data);
            console.log({data})   
        } catch (error) {
            console.log(error)
        }
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        apiHandler();
    }
    if(userData){
        return <Redirect to="/result"/>
    }
    return(
        <SearchContainer>
            <img src={logo} alt="github octocat logo png"/>
            <Title>Find your Profile</Title>
            <form onSubmit={formSubmitHandler}>
                <input value={username} onChange={e=>setUsername(e.target.value)} type="text" placeholder="Github Username" size="50"/>
            </form>
        </SearchContainer>
    )
}
const Title = styled.h1`
    color: #8CC7A1;
    font-size: 6rem;
    margin: 2rem;
`
const SearchContainer = styled.div`
    min-height: 100vh;
    padding: 4rem;
    display:flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    background-color: #4B2142;
    img{
        width: 200px;
        margin-top: 4rem;
    }
    input{
        padding: 1.5rem;
        outline-width: 0;
    }
`
export default Search;