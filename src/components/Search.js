import React,{useState} from "react";
import styled  from "styled-components";
const Search = () => {
    const [username,setUsername] = useState("");
    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(username)
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