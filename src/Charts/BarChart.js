import React, { useState, useEffect,useCallback } from "react";
import Container from "../utils/styles/Container";
import Repos from "../utils/API/repos";
import { Bar } from "react-chartjs-2";

const BarChart = ({ username }) => {
    const [repoData,setRepoData] = useState(null);
    let mainRepoData = [];
    let mostStarredRepos = [];
    let mostStarredRepoName = [];
    const apiHandler = useCallback(
        async() => {
            try {
                const { data } = await Repos.get(`/${username}/repos?per_page=100`);
                setRepoData(data)
            } catch (error) {
                console.log(error)
            }
        },[username]
    )
    useEffect(()=>{apiHandler()},[apiHandler])
    if(repoData){
      mainRepoData = repoData.filter(repo => !repo.fork).sort((function(a, b){return b['stargazers_count'] - a['stargazers_count']})).slice(0,5);
      mostStarredRepos = mainRepoData.map(repo => repo.stargazers_count);
      mostStarredRepoName = mainRepoData.map(repo => repo.name); 
    }
  return (
    <Container>
      <Bar
        data={{
          labels: mostStarredRepoName,
          datasets: [
            {
              // label: "YOUR MOST STARRED REPOS",
              data: mostStarredRepos,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        width={600}
        height={400}
        options={{ maintainAspectRatio: false, responsive: true,  plugins: {
          title: {
            display: true,
            text: 'MOST STARRED REPOS',
          },legend: {
            display: false
          }
        } }}
      />
    </Container>
  );
};

export default BarChart;