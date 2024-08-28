import React from 'react'
import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'
import Avatar from '@material-ui/core/Avatar'

const Contributor = styled.div`
    background-color: ${styles.mainBoxColor};
    color: ${styles.textColor};
    padding: ${styles.boxPadding};
    margin: 10px 5px;
    border-radius: ${styles.borderRadius};
    display: flex;
    justify-content: space-between;
    align-items: center;

    .MuiAvatar-colorDefault{
        background-color: ${styles.yellowColor};
        border-color: ${styles.mainBackgroundColor};
    }
`

const Text = styled.h5`
    margin: 5px;
    color: ${styles.textColor};
    font-family: ${styles.mainFont};
    font-weight: 400;
`

const Name = styled.h4`
    margin: 5px;
    color: ${styles.textColor};
    font-family: ${styles.mainFont};
    font-weight: 700;
`
const StatCircleBox = styled.div`
    width:100%;
    display:flex;
    align-items: center;
`

const Circle = styled.div`
    width:15px;
    height:15px;
    border-radius: 100px;
    margin-left: 5px;
`

export const ContributorsBox = (props) => {
    return (
        <Contributor>
            <div>
                <Name>{props.contributorName}</Name>
                <StatCircleBox>
                    <Circle style={{"backgroundColor": "#feb019"}} />
                    <Text>Contributions - </Text>
                    <Text>{props.contributions}</Text>
                </StatCircleBox>
                <StatCircleBox>
                    <Circle style={{"backgroundColor": "#00e396"}} />
                    <Text>Insertions - </Text>
                    <Text>{props.insertions}</Text>
                </StatCircleBox>
                <StatCircleBox>
                    <Circle style={{"backgroundColor": "#f50057"}} />
                    <Text>Deletions - </Text>
                    <Text>{props.deletions}</Text>
                </StatCircleBox>
            </div>
            <Avatar alt="Remy Sharp" >{props.contributorName[0].toUpperCase()}</Avatar>
        </Contributor>
    )
}