import React,{useContext} from "react"
import {IoLocationOutline} from "react-icons/io5"
import {CgCalendarDates} from "react-icons/cg"
import UserContext from "../context/UserContext"
import Chart from "./Chart"
import styled  from "styled-components"
import { Redirect } from "react-router"

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
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
        <Chart/>
        <Chart/>
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
`
export default DetailsPage;