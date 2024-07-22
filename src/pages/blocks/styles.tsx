import styled from '@emotion/styled';
import Btn from '@mui/material/Button';
import Row from '@mui/material/TableRow';
import { teal } from '@mui/material/colors';

export const TableRow = styled(Row)`
  height: 70px;
`;

export const Button = styled(Btn)`
  border-color: ${teal[100]};
  color: ${teal[500]};
  &:hover {
    border-color: ${teal[100]};
  }
  &:focus {
    background: ${teal[50]};
  }
`;
