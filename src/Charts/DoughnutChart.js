import React, { useState, useEffect,useCallback } from "react";
import Axios from "axios";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const DoughnutChart = ({ username }) => {
    const [repoData,setRepoData] = useState(null);
    let labels = [];
    let data = [];
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
      // get the top 5 most starred repos
      let mainRepoData = repoData.filter(repo => !repo.fork).sort((function(a, b){return b['stargazers_count'] - a['stargazers_count']})).slice(0,5);
      const uniqueLangs = new Set(mainRepoData.map(repo => repo.language));
      labels = Array.from(uniqueLangs.values()).filter(l => l);
      // to get the  count of the each labels
      data = labels.map(lang => {
        const repos = mainRepoData.filter(repo => repo.language === lang);
        const starsArr = repos.map(r => r.stargazers_count);
        const starSum = starsArr.reduce((a, b) => a + b, 0);
        return starSum;
      })
    }
    
  return (
    <Container>
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: "YOUR MOST STARRED REPOS",
              data: data,
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
        options={{ maintainAspectRatio: false, responsive: true , plugins: {
          title: {
            display: true,
            text: 'STARS PER LANGUAGE',
          }
        }}}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 350px;
  margin: 1rem;
  position: relative;
  width: 400px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  :hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;
export default DoughnutChart;