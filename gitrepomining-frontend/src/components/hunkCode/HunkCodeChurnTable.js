import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'
import  api from '../../Api'

const HunksCodeTable = styled.div`
  margin-left:10px 5px;
  background-color: ${styles.mainBoxColor};
  border-radius: ${styles.borderRadius};
  max-height:700;
  padding: ${styles.boxPadding};
  padding-right: 0;
  margin-top: 7px;
  margin-left: 7px;

  h4{
    padding: ${styles.boxPadding};
    font-family: ${styles.mainFont};
    color: ${styles.textColor};
    padding-top: 0;
    padding-left: 0;
  }
`

const DataGridStyled = styled(DataGrid)`
  width: 98%;
  height: 430px;
  color: ${styles.textColor};
  border: none;

  .MuiToolbar-root{
    color: ${styles.textColor};
  }
`

const columns = [
  { field: 'filename', headerName: 'File', flex: 1 },
  { field: 'hunksCount', headerName: 'Hunks count',  flex: 1, type: 'number' },
  { field: 'codeChurnTotal', headerName: 'Total Code Churn',  flex: 1,  type: 'number' },
  { field: 'codeChurnMax', headerName: 'Maximum Code Churn',  flex: 1, type: 'number' },
  { field: 'codeChurnAvg', headerName: 'Average Code Churn',  flex: 1, type: 'number' },
];

const HunkCodeChurnTable = (props) => {
  const [files, setfilesData] = useState([])

  const retrieve_files_data_from_backend = () => {
    api.get("/fileHistory/" + props.id).then(res => {

    // need to loop through the data to add an id and to change the filename
      for(let i=0;i<res.data.length;i++){
        res.data[i]['id'] = i;
        if(res.data[i]['filename'] != null){
          let index = res.data[i]['filename'].lastIndexOf('\\');
          res.data[i]['filename'] = res.data[i]['filename'].slice(index+1)
        }
      }
      setfilesData(res.data)
    })
  }

  useEffect(() => {
      retrieve_files_data_from_backend()
  }, [props.id])

    return (
        <HunksCodeTable>
            <h4>Hunks values & Code Churn</h4>
            <DataGridStyled rows={files} columns={columns} pageSize={5} />
        </HunksCodeTable>
    )
}
export default HunkCodeChurnTable;





