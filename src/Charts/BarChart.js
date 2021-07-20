import React, { useState, useEffect,useCallback } from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const BarChart = ({ username }) => {
    const [repoData,setRepoData] = useState(null);
    let stars = [];
    let repoName = [];
    const apiHandler = useCallback(
        async() => {
            try {
                const { data } = await Axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
                setRepoData(data)
            } catch (error) {
                console.log(error)
            }
        },[username]
    )
    useEffect(()=>{apiHandler()},[apiHandler])
    if(repoData){
        stars = repoData.filter(repo => !repo.fork).sort((function(a, b){return b['stargazers_count'] - a['stargazers_count']})).slice(0,5);
        repoName = repoData.map(data=> data.full_name);
        // stars.sort((function(a, b){return b['stargazers_count'] - a['stargazers_count']})).slice(0,5);
       
    }
    // console.log(repoData)
    console.log(stars)
    // console.log(repoName)
  return (
    <Container>
      <Bar
        data={{
          labels: repoName,
          datasets: [
            {
              label: "# of Votes",
              data: [1,2,3],
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
        options={{ maintainAspectRatio: false, responsive: true }}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default BarChart;
