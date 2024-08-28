import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'
import Button from '@material-ui/core/Button'

const StyledRepoBox = styled.div`
   background-color: ${styles.mainBoxColor};
   font-family: ${styles.mainFont};
   color: ${styles.textColor};
   padding: ${styles.boxPadding} 20px;
   border-radius: ${styles.borderRadius};
   margin: 5px;
   margin-bottom: 10px;
   border-left: 7px solid ${styles.yellowColor};

   display: flex;
   justify-content: space-between;
   align-items: center;
   text-align: left;



   h4{
       margin-bottom: 5px;
   }

   h5{
       font-weight: 400;
   }
`

const ButtonStyled = styled(Button)`
   background-color: ${styles.yellowColor}!important;
   color: ${styles.mainBoxColor}!important;
`

const RepoBox = (props) => {
    return (
        <StyledRepoBox>
            <div>
                <h4>{props.text}</h4>
                <h5>{props.title}</h5>
                <h5 style={{"color": "#78ca62"}}>Last updated on git analyzer: {props.lastUpdate}</h5>
            </div>
            <ButtonStyled size="small" variant="contained" href={"http://localhost:3000/" + props.id}>
                View Data
            </ButtonStyled>
        </StyledRepoBox>
    )
}

export default RepoBox;