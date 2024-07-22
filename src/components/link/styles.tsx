import styled from '@emotion/styled';
import { teal } from '@mui/material/colors';

export const Container = styled.div`
  a {
    color: ${teal[600]};
    font-weight: 600;
    border-bottom: 1px solid white;
    &:hover {
      border-bottom: 1px solid ${teal[900]};
    }
  }
`;
