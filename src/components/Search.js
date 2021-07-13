import React,{useState} from "react";
import Axios from "axios";
import styled  from "styled-components";

const Search = () => {
    const [username,setUsername] = useState("");
    const [userData,setUserData] = useState(null);

    const apiHandler = async() => {
        const { data } = await Axios.get(`https://api.github.com/users/${username}`);
        setUserData(data);
        console.log({data})
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        apiHandler();
    }
    return(
        <SearchContainer>
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #4B2142;
    input{
        padding: 1.5rem;
    }
`
export default Search;