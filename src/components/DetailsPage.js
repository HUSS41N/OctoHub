import React, { useContext,useEffect,useCallback} from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import UserContext from "../context/UserContext";
import DoughnutChart from "../Charts/DoughnutChart";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import Repositories from "./Repositories";
import styled from "styled-components";
// import { Redirect } from "react-router";
import Axios from "axios";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const DetailsPage = () => {
  const [user, setUser] = useContext(UserContext);
  let query = useQuery();
  let username = query.get("username");

  const apiHandler = useCallback(
    async() => {
        try {
            const { data } = await Axios.get(`https://api.github.com/users/${username}`);
            console.log({ data });
            setUser(data);
        } catch (error) {
            console.log(error)
        }
    },[username,setUser]
)
  useEffect(()=>{apiHandler()},[apiHandler])

  return (
    <MainContainer>
      <DetailsDiv>
        <img src={user.data.avatar_url} alt="placeholder" />
        <h1>{user.data.name}</h1>
        <a href={user.data.html_url}>@{user.data.login}</a>
        <div>
          <p>
            <IoLocationOutline /> {user.data.location}
            {"    "}
          </p>
          <p>
            <CgCalendarDates /> joined{" "}
            {new Date(user.data.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
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
        <PieChart username={query.get("username")} />
        <BarChart username={user.data.login} />
        <DoughnutChart username={user.data.login} />
      </ChartContainer>
      <X>
        <Repositories username={user.data.login} />
      </X>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  position: relative;
`;
const X = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 1050px;
  @media only screen and (max-width: 1126px) {
    top: 1300px;
  }
  @media only screen and (max-width: 748px) {
    top: 1650px;
  }
  @media only screen and (max-width: 550px) {
    top: 1550px;
  }
  @media only screen and (max-width: 400px) {
    top: 1450px;
  }
`;
const DetailsDiv = styled.div`
  min-height: 90vh;
  background-color: #4b2142;
  display: flex;
  flex-direction: column;
  padding: 5rem;
  /* justify-content: center; */
  align-items: center;
  a {
    font-size: 2rem;
    margin: 1.5rem;
    color: #816e94;
    text-decoration: none;
  }
  img {
    width: 200px;
    border-radius: 50%;
  }
  h1 {
    color: #8cc7a1;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 5rem;
  }
  div {
    display: flex;
    font-size: 2rem;
    color: #97ead2;
  }
  div p {
    margin: 1rem;
  }
`;
const StatDiv = styled.div`
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #8cc7a1;
    color: #74226c;
    padding: 1rem;
    border-radius: 10px;
    margin: 2rem;
    p {
      font-size: 1.6rem;
    }
  }
  @media only screen and (max-width: 400px) {
  }
`;
const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  left: 0;
  right: 0;
  top: 625px;
`;
export default DetailsPage;
