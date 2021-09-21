import React from "react";
import { withRouter } from 'react-router-dom';
import logo from "../logo/Octocat.png"
import {FiSearch} from "react-icons/fi"
import styled  from "styled-components";


class Search extends React.Component{
    state = {username:""}
    
    formSubmitHandler (e){
        e.preventDefault()
        this.props.history.push(`/result?username=${this.state.username}`);
    }

    render(){
        return(
            <SearchContainer>
                <img src={logo} alt="github octocat logo png"/>
                <Title>Find your Profile</Title>
                <form onSubmit={this.formSubmitHandler.bind(this)}>
                    <SearchBox>
                    <input value={this.state.username} onChange={e=>this.setState({username:e.target.value})} type="text" placeholder="Github Username" size="50"/>
                    <button type="submit"><FiSearch/></button>
                    </SearchBox>
                </form>
            </SearchContainer>
        )
    }

}
const Title = styled.h1`
    color: #e3f6f5;
    font-size: 6rem;
    margin: 2rem;
    @media only screen and (max-width: 525px) {
        font-size:4rem;
        margin: 1rem;
    }
`
const SearchBox = styled.span`
    position: relative;
    button {
    margin-top: 1rem;
    @media only screen and (max-width: 525px) {
        margin-top: 0.5rem;
    }
    padding: 0rem 4rem;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5px;
    border: none;
    background: transparent;
    color: #999;
    font-size: 3rem;
    line-height: 20px;

    }
    button:hover{
        cursor: pointer;
    }
`
const SearchContainer = styled.div`
    min-height: 100vh;
    padding: 10rem;
    display:flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    background-color: #272643;
    img{
        width: 200px;
        margin-top: 4rem;
    }
    input{
        border: none;
        font-size: 1.70rem;
        padding: 1.75rem;
        padding: 1.75rem 1.5rem 1.75rem 1rem;
        outline-width: 0;
        border-radius: 50px;
    }
    button{}
`
export default withRouter(Search);