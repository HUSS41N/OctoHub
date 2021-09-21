import React from "react";
import { withRouter } from 'react-router-dom';
import logo from "../logo/Octocat.png"
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
                    <input value={this.state.username} onChange={e=>this.setState({username:e.target.value})} type="text" placeholder="Github Username" size="50"/>
                </form>
            </SearchContainer>
        )
    }

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
export default withRouter(Search);