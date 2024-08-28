import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import  api from '../../Api'

const ContributorStatsBox = styled.div`
    padding: ${styles.boxPadding};
    border-radius: ${styles.borderRadius};
    background-color: ${styles.mainBoxColor};
    color: ${styles.textColor};
    font-family: ${styles.mainFont};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    border-right: 7px solid ${styles.yellowColor};

    h5{
        margin-bottom: 5px;
    }

    h5{
        font-weight: 400;
    }
`

const AvatarGroupStyled = styled(AvatarGroup)`
    margin-left: 1.2em;
    
    .MuiAvatar-colorDefault{
        background-color: ${styles.mainBackgroundColor};
        border-color: ${styles.mainBoxColor};
    }
`

const AvatarStyled = styled(Avatar)`
    background-color: ${styles.yellowColor};
    border-color: ${styles.mainBackgroundColor};

`


export const ContributorStats = (props) => {
    const [contributorsData, setContributorsData] = useState([])
    const [dataAppended, setDataAppended] =  useState(false)

    const retrieve_contributor_data_from_backend = async () => {
        await api.get('/contributor/' + props.id).then(res => {
            setContributorsData(res.data)
        });
    }

    useEffect(() => {
        retrieve_contributor_data_from_backend()
    }, [props.id])

    useEffect(() => {
        if(contributorsData && contributorsData.length > 0){
            setDataAppended(true)
        }
    }, [contributorsData])


    return (
        <ContributorStatsBox>
            <div>
                <h4>{contributorsData.length}</h4>
                <h5 style={{"marginBottom": "0"}}>Contributor(s)</h5>
            </div>
            <AvatarGroupStyled max={6}>
                {
                    dataAppended ?
                    contributorsData.map( (contributor, index) => {
                        return <AvatarStyled key={index} alt={contributor.contributorName} >{contributor.contributorName[0].toUpperCase()}</AvatarStyled>
                    }) : null
                }
            </AvatarGroupStyled>
        </ContributorStatsBox>
    )
}
