import React, { useState, useEffect } from 'react'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Input } from '@material-ui/core'
import RepoBox from './RepoBox'
import styled from 'styled-components'
import {styles} from '../../styleVariables/colorFontVariables'
import  api from '../../Api'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ReposDisplayed = styled.div`
    width: 40%;
    margin: 3em auto;

    text-align: center;
    color: ${styles.textColor};
    font-family: ${styles.mainFont};

    h1{
        margin-bottom: 2em;
    }
`


const FormControlStyled = styled(FormControl)`
    width:100%;
    margin: 2em auto;
    padding: ${styles.boxPadding};
    border-radius: ${styles.borderRadius};

    input, label {
        font-family: ${styles.mainFont};
        color: ${styles.textColor};
    }
`

const InputStyled = styled(Input)`
    padding: 10px;
    margin-bottom: 15px;
    background-color: ${styles.mainBoxColor};
`
const ButtonStyled = styled(Button)`
    margin-bottom: 15px!important;
    background-color: ${styles.yellowColor}!important;
`


export const RepoDisplay = () => {
    const [repoData, setRepoData] = useState([])
    const [dataAppended, setdataAppended] = useState(false)
    const [loadingPage, setloadingPage] = useState(false)
    const [urlData, seturlData] = useState("")
    const [error, setError] =  useState(false)
    const [open, setOpen] = useState(false);
    const [processedSuccessfully, setprocessedSuccessfully] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setError(false)
        setprocessedSuccessfully(false)
    };

    const handleSubmit = async () => {
        setloadingPage(true)
        await axios({
            method: 'post',
            url: 'http://localhost:5000/data',
            data : {
                url: urlData
            },
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).then(res => {
            console.log(res.data)
            setError(res.data.error)
            setprocessedSuccessfully(res.data.correct)
            setOpen(true)
            retrieve_repo_data()
        })
    }


    const retrieve_repo_data = async () => {
        await api.get("/repository").then(res => {
            setRepoData(res.data)
        })
    }

    useEffect(() => {
        retrieve_repo_data()
    }, [])

    const update_url = (event) => {
        console.log(event.target.value)
        seturlData(event.target.value)
    }

    useEffect(() => {
        if (error && processedSuccessfully){
            setprocessedSuccessfully(true)
            setError(false)
        }
        if(repoData && repoData.length > 0){
            setdataAppended(true)
            seturlData("")
        }
        setloadingPage(false)
        setOpen(true)
    }, [repoData])

    
    return (
        <>
        
            <ReposDisplayed>
                { error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">
                                Unsucessful, please make sure the url/path is correct.
                                </Alert>
                            </Snackbar>
                }
                { processedSuccessfully && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                Successfully processed or updated the data. 
                                </Alert>
                            </Snackbar>
                }
                <h1>All available git repos</h1>
                {
                    loadingPage ?
                     
                        <>
                            <h1>Currently procesing the data!! This could take a while</h1>
                            <CircularProgress color="secondary" />
                        </>
                        :
                    <>
                        <h3>Cant see your repo ? Enter a github repo url or the path of a local repo!!</h3>
                        <form method="post"  id="sendLink-form" class="form-example" onSubmit={handleSubmit} >
                            <FormControlStyled>
                                <InputLabel htmlFor="my-input" style={{"z-index": "100"}}>Repo path/url</InputLabel>
                                <InputStyled type="url" name="url" id="my-input" aria-describedby="my-helper-text" onChange={update_url} />
                                <ButtonStyled variant="contained" type="submit" >
                                    Get Data
                                </ButtonStyled>
                            </FormControlStyled>
                        </form>
                    </> 

                }
                {
                    dataAppended ?
                    repoData.map(repo => {
                        return <RepoBox title={"Last modified: " + repo.lastModified} text={repo.gitRepoName} id={repo.id} lastUpdate={repo.lastUpdateInGitAnalyser}/>
                    })
                    :
                    <h1>No repo data to show</h1>
                }
            </ReposDisplayed>
        </>
    )
}
