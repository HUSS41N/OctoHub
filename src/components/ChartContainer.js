import styled from "styled-components"
import DoughnutChart from "../Charts/DoughnutChart";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";

const ChartContainer = ({username}) => {
    return(
        <ChartDiv>
            <PieChart username={username} />
            <BarChart username={username} />
            <DoughnutChart username={username} />
        </ChartDiv>
    )
}

const ChartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  left: 0;
  right: 0;
  top: 625px;
`;

export default ChartContainer