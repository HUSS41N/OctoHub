import Container from "../utils/styles/Container";
import { Bar } from "react-chartjs-2";

const BarChart = ({repoData}) => {

    let mainRepoData = [];
    let mostStarredRepos = [];
    let mostStarredRepoName = [];
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
                "#272643",
                "#3a82e4",
                "#40b2a4",
                "#eff2ec",
                "#dedad0",
                "#d0e6da",
                "#085856",
                "#24366e",
                "#143e50",
                "#7e245c",
                "#eeca4a",
              ],
              borderColor: [
                "#272643",
                "#3a82e4",
                "#40b2a4",
                "#eff2ec",
                "#dedad0",
                "#d0e6da",
                "#085856",
                "#24366e",
                "#143e50",
                "#7e245c",
                "#eeca4a",
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