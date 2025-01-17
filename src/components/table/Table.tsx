import { ReactNode } from 'react';

import Pagination, { PaginationProps } from '@mui/material/Pagination';

import { Container, TableContainer, TableWrapper } from './styles';

interface Props {
  children?: ReactNode;
  isPagination?: boolean;
  count?: number;
  page?: number;
  onChange?: PaginationProps['onChange'];
}
const Table = ({ isPagination = true, count, page, children, onChange }: Props) => {
  return (
    <Container>
      <TableContainer>
        <TableWrapper>{children}</TableWrapper>
      </TableContainer>
      {isPagination ? <Pagination count={count} page={page} shape="rounded" onChange={onChange} /> : ''}
    </Container>
  );
};

export default Table;
