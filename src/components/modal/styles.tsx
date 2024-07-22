import styles from '@emotion/styled';
import IModal from '@mui/joy/Modal';

export const Modal = styles(IModal)`
  .MuiModalDialog-root {
    padding: 0;
    border: none;
  } 
  
  .MuiCardOverflow-root {
    top: -1px;
    background: #001529;
    padding: 41px 50px 31px;
  }
  
  .MuiCardOverflow-root {
    align-items: baseline;
    gap: 27px;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
 
`;
