import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import GhPolyglot from "gh-polyglot";

const PieChart = ({ username }) => {
  const [langData, setLangData] = useState(null);
  let userData = [];
  let userLabels = [];
  useEffect(() => {
    let me = new GhPolyglot(`${username}`);
    me.userStats((err, stats) => {
      if (err) {
        console.log(err);
      } else {
        setLangData(stats);
      }
    });
  }, [username]);

  if (langData) {
    userData = langData.map((val) => val.value);
    userLabels = langData.map((val) => val.label);
  }

  return (
    <Container>
      <Pie
        data={{
          labels: userLabels,
          datasets: [
            {
              label: "# of Votes",
              data: userData,
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
        options={{ maintainAspectRatio: false, responsive: true ,  plugins: {
          title: {
            display: true,
            text: 'TOP LANGUAGES',
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
`;
export default PieChart;
