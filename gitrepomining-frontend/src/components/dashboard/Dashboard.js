import React, { useEffect, useState} from 'react'
import { MajorAndMinorContributors } from '../charts/MajorAndMinorContributors'
import { ContributorSearchContainer } from '../contributors/ContributorSearchContainer'
import { AppBarTop } from '../AppBar/AppBarTop'
import styled from 'styled-components'
import { RepoName } from '../general/RepoName'
import StatsBox from '../statsbox/StatsBox'
import { styles } from '../../styleVariables/colorFontVariables'
import { CommitsPopout } from '../commits/CommitsPopout'
import { ContributorStats } from '../contributors/ContributorStats'
import HunkCodeChurnTable from '../hunkCode/HunkCodeChurnTable'
import {useParams} from "react-router-dom"
import  api from '../../Api'

const TitleAndDates = styled.div`
  padding: ${styles.boxPadding} 0 0 ${styles.boxPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FlexData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatsRow = styled.div`
  width: 100%;
  padding: 0 0;
  display: flex;
  justify-content: space-between;
` 
const GridLayout = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 5px;
`

const ChartDiv = styled.div`
    overflow: hidden;
`

export const Dashboard = () => {

    const { id } = useParams()

    const [dashboardData, setDashboardData] = useState({})
    const [dataAppended, setDataAppended] = useState(false)
    const [filesCount, setfilesCount] = useState(0)

    const retrieve_dashboard_data_from_backend = async () => {
        await api.get('/repository/'+id).then(res => {
            setDashboardData(res.data)
        });
        await api.get('/fileHistory/'+id).then(res => {
            setfilesCount(res.data.length)
        });
    }

    useEffect(() => {
        if (dashboardData){
        setDataAppended(true);
        }
    }, [dashboardData])

    useEffect(() => {
        retrieve_dashboard_data_from_backend();
    }, [])


    return (
        <div>
            {
                dataAppended ?
                <>
                    <AppBarTop></AppBarTop>
                    <TitleAndDates>
                        <RepoName name={dashboardData['gitRepoName']} ></RepoName>
                        <FlexData>
                            <StatsBox title="Start Date" text={dashboardData['startDate']}></StatsBox>
                            <StatsBox title="Last modified date" text={dashboardData['lastModified']}></StatsBox>
                        </FlexData>
                    </TitleAndDates>
                    <StatsRow>
                        <StatsBox title="Number of commits" text={dashboardData['totalCommits']}></StatsBox>
                        <StatsBox title="Total lines added" text={dashboardData['totalLinesAdded']}></StatsBox>
                        <StatsBox title="Total lines removed" text={dashboardData['totalLineRemoved']}></StatsBox>
                        <CommitsPopout id={id}></CommitsPopout>
                    </StatsRow>
                    <StatsRow>
                        <StatsBox title="Change sets (Max)" text={dashboardData['changeSetsMax']}></StatsBox>
                        <StatsBox title="Change sets (Average)" text={dashboardData['changeSetsAvg']}></StatsBox>
                        <StatsBox title="Number of files" text={filesCount}></StatsBox>
                        <ContributorStats id={id}></ContributorStats>
                    </StatsRow>
                    <GridLayout>
                        <ChartDiv>
                            <MajorAndMinorContributors id={id} />
                            <HunkCodeChurnTable id={id} />
                        </ChartDiv>
                        <ContributorSearchContainer id={id}/>
                    </GridLayout>
                </>
                :
                <h1>Not quite working yet??</h1>
            }
        </div>
    )
}
