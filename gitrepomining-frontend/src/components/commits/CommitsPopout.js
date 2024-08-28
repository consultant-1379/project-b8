import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'
import Modal from '@material-ui/core/Modal'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import { DataGrid } from '@material-ui/data-grid'
import CloseIcon from '@material-ui/icons/Close'
import api from '../../Api'
import StatsBox from '../statsbox/StatsBox'


const CommitsBox = styled.div`
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
`

const FullscreenIconStyled = styled(FullscreenIcon)`
    color: ${styles.textColor};
    margin-left: 1.2em;
    cursor:pointer;
    transition: ease-in-out 0.2s color;

    &:hover{
        color: grey;
    }
`

const ModalBody = styled.div`
    width:90%;
    margin: 2em auto;
    background-color: ${styles.mainBoxColor};
    padding: ${styles.boxPadding};
    border-radius: ${styles.borderRadius};
    background-color: ${styles.mainBoxColor};
    color: ${styles.textColor};
    font-family: ${styles.mainFont};
    outline: none;
`


const DataGridStyled = styled(DataGrid)`
  width: 98%;
  height: 800px;
  color: ${styles.textColor};
  border: none;

  .MuiToolbar-root{
    color: ${styles.textColor};
  }
`

const FlexData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CloseIconStyled = styled(CloseIcon)`
  cursor: pointer;
    &:hover{
        color: grey;
    }
`

const columns = [
    { field: 'hashValue', headerName: 'Hash', flex: 1 },
    { field: 'authorName', headerName: 'Contributor',  flex: 1,  },
    { field: 'commitMessage', headerName: 'Commit Message',  flex: 1,  },
    { field: 'commitInsertion', headerName: 'Insertions',  flex: 1, },
    { field: 'commitDeletion', headerName: 'Deletions',  flex: 1, },
    { field: 'commitDate', headerName: 'Date Commited',  flex: 1, },
];
  

export const CommitsPopout = (props) => {
    const [open, setOpen] = React.useState(false);
    const [commitsData, setCommitsData] = useState([])
    const [dataAppended, setDataAppended] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const retrieve_commits_data_from_backend = async () => {
        let modifiedData = []
        await api.get('/commithistory/' + props.id).then(res => {
            for (let i=0;i<res.data.length;i++){
                res.data[i]['id'] = i
                modifiedData.push(res.data[i])
            }
            setCommitsData(modifiedData);
        });
    }

    useEffect(() => {
        if(commitsData && commitsData.length > 0){
            setDataAppended(true); // check to see if the data has been set
        }
    }, [commitsData])

    useEffect(() => {
        retrieve_commits_data_from_backend()
    }, [props.id])

    return (
        <>
            {
                dataAppended ?
                <>
                    <CommitsBox>
                        <div>
                            <h5 styles={{"fontWeight": "400"}}>{commitsData[0]['hashValue']}</h5>
                            <h5 style={{"marginBottom": "0", "fontWeight": "300"}}>Last Commit: {commitsData[0]['commitDate']}</h5>
                        </div>
                        <FullscreenIconStyled onClick={handleOpen}/>
                    </CommitsBox>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <ModalBody>
                            <FlexData>
                                <h2>All Commits</h2>
                                <CloseIconStyled onClick={handleClose} />
                            </FlexData>
                            <DataGridStyled rows={commitsData} columns={columns} pageSize={10} />
                        </ModalBody>
                    </Modal>
                </>:
                <StatsBox title={"No commits to show"} text={"0"} />
            }
        </>
    )
}
