import { Doughnut } from "react-chartjs-2";
import Container from "../utils/styles/Container";


const DoughnutChart = ({ repoData }) => {

    let labels = [];
    let data = [];

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
export default DoughnutChart;