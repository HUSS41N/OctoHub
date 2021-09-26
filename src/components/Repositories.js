import React, { useState, useEffect, useCallback } from "react";
import { RiGitRepositoryLine, RiStarFill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { IoResizeSharp } from "react-icons/io5";
import Repos from "../utils/API/repos";
import { v1 as uuidv1 } from 'uuid';
import styled from "styled-components";

const Repositories = ({ username }) => {
  const [repoData, setRepoData] = useState(null);
  let finalData = [];
  const apiHandler = useCallback(async () => {
    try {
      const { data } = await Repos.get(`/${username}/repos?per_page=100`);
      setRepoData(data);
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  useEffect(() => {
    apiHandler();
  }, [apiHandler]);
  
  if (repoData) {
    finalData = repoData.map((repo) => ({
      name: repo.name,
      desription: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      size: repo.size,
    }));
    finalData = finalData
      .filter((repo) => !repo.fork)
      .sort(function (a, b) {
        return b["stars"] - a["stars"];
      })
      .slice(0, 12);
  }
  return (
    <AllRepoContainer>
      {finalData.map((data) => (
        <RepoContainer key={uuidv1()}>
            <div>
            <h2>
            <RiGitRepositoryLine /> {data.name}
          </h2>
          <p>{data.desription}</p>
            </div>

          <RepoBottom>
            <div>
              <span>
                <GrLanguage /> {data.language} 
              </span>
              <br></br>
              <span>
                <RiStarFill /> {data.stars}
              </span>
            </div>
            <div>
              <span>
                <IoResizeSharp /> {data.size}
              </span>
            </div>
          </RepoBottom>
        </RepoContainer>
      ))}
    </AllRepoContainer>
  );
};
const AllRepoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 2200px;
`;
const RepoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  font-size: 1.25rem;
  height: 20rem;
  width: 33.5rem;
  margin: 1rem;
  padding: 4rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    color: #2e2e2e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media only screen and (max-width: 600px) {
        width: 45rem;
  }
`;

const RepoBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default Repositories;
