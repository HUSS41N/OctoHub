import React,{useContext} from "react"
import {IoLocationOutline} from "react-icons/io5"
import {CgCalendarDates} from "react-icons/cg"
import UserContext from "../context/UserContext"
import Chart from "../Charts/Chart"
import PieChart from "../Charts/PieChart"
import BarChart from "../Charts/BarChart"
import styled  from "styled-components"
import { Redirect } from "react-router"

const DetailsPage = () => {
    const [user,setUser] = useContext(UserContext)
    if(!user){
        return <Redirect to="/"/>
    }
    return (
        <div>
        <DetailsDiv>
            <img src={user.data.avatar_url} alt="placeholder"/>
            <h1>{user.data.name}</h1>
            <a href={user.data.html_url}>@{user.data.login}</a>
            <div>
                <p> 
                    <IoLocationOutline/>
                    {" "}
                    { user.data.location}
                    {"    "}
                </p>
                <p>
                    <CgCalendarDates/>
                    {" "}joined{" "}
                    {new Date(user.data.created_at).toLocaleDateString("en-US",{
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })}
                </p>
            </div>
            <StatDiv>
            <div>
                <h2>{user.data.followers}</h2>
                <p>Followers</p>
            </div>
            <div>
                <h2>{user.data.public_repos}</h2>
                <p>Repositories</p>
            </div>
            <div>
                <h2>{user.data.following}</h2>
                <p>Following</p>
            </div>
        </StatDiv>
        </DetailsDiv>
        <ChartContainer>
        <PieChart username = {user.data.login}/>
        <BarChart username = {user.data.login}/>
        <Chart/>
        </ChartContainer>
        </div>
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
        width: 200px;
        border-radius: 50%;
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
        margin: 1rem;
    }
    `
const StatDiv = styled.div`
    div{
        display: flex ;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #8CC7A1;
        color: #74226C;
        padding: 1rem;
        border-radius: 10px;
        margin: 2rem;
        p{
            font-size: 16px;
        }
    }
`
const ChartContainer = styled.div`
  display: flex ;
  justify-content: center;
  align-items:center;
  flex-wrap: wrap;
`
export default DetailsPage;