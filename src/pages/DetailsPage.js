import React, { useState, useEffect, useCallback } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import ChartContainer from "../components/ChartContainer";
import Repositories from "../components/Repositories";
import styled from "styled-components";
// import { Redirect } from "react-router";
import Axios from "axios";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DetailsPage = () => {
  const [user, setUser] = useState({});
  let query = useQuery();
  let username = query.get("username");

  const apiHandler = useCallback(async () => {
    try {
      const { data } = await Axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [username, setUser]);

  useEffect(() => {
    apiHandler();
  },[apiHandler]);
  return (
    
    <MainContainer>
      <DetailsDiv>
        <img src={user.avatar_url} alt="placeholder" />
        <h1>{user.name}</h1>
        <a href={user.html_url}>@{user.login}</a>
        <div>
          <p>
            <IoLocationOutline /> {user.location}
            {"    "}
          </p>
          <p>
            <CgCalendarDates /> joined{" "}
            {new Date(user.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <StatDiv>
          <div>
            <h2>{user.followers}</h2>
            <p>Followers</p>
          </div>
          <div>
            <h2>{user.public_repos}</h2>
            <p>Repositories</p>
          </div>
          <div>
            <h2>{user.following}</h2>
            <p>Following</p>
          </div>
        </StatDiv>
      </DetailsDiv>
      <ChartContainer username={username}></ChartContainer>
      <Space>
        <Repositories username={username} />
      </Space>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  position: relative;
`;
const Space = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 1050px;
  /* width: 80%; */
  margin: auto;
  @media only screen and (min-width: 1920px) {
    width:80%
  }
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
// #e3f6f5

const DetailsDiv = styled.div`
  min-height: 90vh;
  background-color: #272643;
  display: flex;
  flex-direction: column;
  padding: 5rem;
  /* justify-content: center; */
  align-items: center;
  a {
    font-size: 2rem;
    margin: 1.5rem;
    color: #e3f6f5;
    text-decoration: none;
  }
  img {
    width: 200px;
    border-radius: 50%;
  }
  h1 {
    color: #e3f6f5;
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
    background-color: #e3f6f5;
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

export default DetailsPage;
