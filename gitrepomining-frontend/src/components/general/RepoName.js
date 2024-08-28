import React from 'react'
import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'

const RepoStyledName = styled.h1`
    font-family: ${styles.mainFont};
    color: ${styles.textColor};
    font-weight: 700;
`

export const RepoName = (props) => {
    return (
        <RepoStyledName>
            Overview - {props.name}
        </RepoStyledName>
    )
}
