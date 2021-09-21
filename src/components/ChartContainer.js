import {useState,useCallback,useEffect} from "react"
import styled from "styled-components"
import DoughnutChart from "../Charts/DoughnutChart";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import Repos from "../utils/API/repos";

const ChartContainer = ({username}) => {
    const [repoData,setRepoData] = useState(null);

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

    return(
        <ChartDiv>
            <PieChart username={username} />
            <BarChart repoData={repoData}/>
            <DoughnutChart repoData={repoData} />
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