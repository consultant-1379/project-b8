import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'
import { ContributorsBox } from './ContributorsBox'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import api from '../../Api'

const SearchBox = styled.div`
    width: 99%;
    height: 970px;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
`

const SearchBoxField = styled.div`
    padding: 7px;
    background-color: ${styles.mainBoxColor};
    margin: 5px;
    color: ${styles.textColor};
    border-radius: ${styles.borderRadius};
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 100;
    label {
        color: ${styles.textColor};
    }
`

const TextFieldStyled = styled(TextField)`
    #input-with-icon-grid{
        color: ${styles.textColor};
    }
`

export const ContributorSearchContainer = (props) => {
    const [contributorsData, setContributorsData] = useState([])
    const [searchValue, setSearchValue] = useState("")

    const retrieve_contributor_data_from_backend = async () => {
        await api.get('/contributor/' + props.id).then(res => {
            setContributorsData(res.data)
        });
    }

    const addSearchValue = (event) => {
        setSearchValue(event.target.value.toLowerCase())
    }

    useEffect(() => {
        // empty to allow react to re-draw the component
    }, [searchValue])

    useEffect(() => {
        retrieve_contributor_data_from_backend()
    }, [props.id])

    
    return (
        <SearchBox>
            <SearchBoxField >
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <SearchIcon color="secondary"/>
                    </Grid>
                    <Grid item>
                        <TextFieldStyled id="input-with-icon-grid" label="Search for a user" color="secondary" style={{"width": "100%", "color": "white"}} onChange={addSearchValue}/>
                    </Grid>
                </Grid>
            </SearchBoxField>
            {
                contributorsData.map( (contributor, index) => {
                    if (contributor['contributorName'].toLowerCase().includes(searchValue)){
                        return <ContributorsBox key={index} {...contributor} ></ContributorsBox>
                    }
                    return null
                    
                })
            }
        </SearchBox>
    )
}
