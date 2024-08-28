import styled from 'styled-components';
import { styles } from '../../styleVariables/colorFontVariables'

const StyledStatsBox = styled.div`
   background-color: ${styles.mainBoxColor};
   font-family: ${styles.mainFont};
   color: ${styles.textColor};
   padding: ${styles.boxPadding} 20px;
   border-radius: ${styles.borderRadius};
   margin: 5px;
   border-left: 7px solid ${styles.yellowColor};
   width: inherit;



   h4{
       margin-bottom: 5px;
   }

   h5{
       font-weight: 400;
   }
`

const StatsBox = (props) => {
    return (
        <StyledStatsBox>
          <h4>{props.text}</h4>
          <h5>{props.title}</h5>
        </StyledStatsBox>
    )
}

export default StatsBox;
