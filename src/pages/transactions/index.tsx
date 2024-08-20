import { useCallback, useEffect, useMemo, useState } from 'react';

import { ArrowDownward as ArrowDownwardIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import TableCell from '@mui/material/TableCell';
import { TransactionsService } from '@services';
import { SkeletonTable, Table, TableBody, TableHead, Time } from 'barrel-ui-kit';

import { Transaction } from '@type/dto/transaction';

import LinkUnderline from '@components/link';

import { Char } from '@utils';

import { Container, TableRow } from './styles';

interface Props {
  isPagination: boolean;
  isSimpleData: boolean;
  size: number;
}
const Transactions = ({ isPagination = true, size = 10, isSimpleData = false }: Props) => {
  const [isMobile, setMobile] = useState<boolean>();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setMobile(isMobile);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.userAgent]);

  const [page, setPage] = useState(1);

  const { data } = TransactionsService().GetAll({ page, size });

  const handleChange = (_, value: number) => {
    setPage(value);
  };

  const TableCellAccount = useCallback((value: string) => {
    const underlink = Char.add0x(isSimpleData ? Char.ellipsisEnd(value) : Char.add0x(Char.ellipsisMiddle(value)));

    return <LinkUnderline path={`/account/${Char.add0x(value)}`} underlink={underlink} />;
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const count = useMemo(() => (data ? Math.ceil(data.totalCount / size) : 1), [data]);

  return (
    <Container>
      <Table count={count} page={page} isPagination={isPagination} onChange={handleChange}>
        <TableHead>
          <TableRow>
            <TableCell>TX Hash</TableCell>
            <TableCell>Age</TableCell>
            {!isSimpleData && <TableCell align="left">Block</TableCell>}
            {!isMobile ? (
              <>
                <TableCell align="left">From</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">To</TableCell>
              </>
            ) : (
              <>
                <TableCell align="left">From / To</TableCell>
              </>
            )}

            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!data ? (
            <SkeletonTable columns={isSimpleData ? 6 : 7} size={size} />
          ) : (
            data.transactions.map((row: Transaction) => (
              <TableRow data-cy="tx-items" key={row.hash} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell style={{ width: 130 }} align="left">
                  <LinkUnderline
                    path={`/transaction/${Char.add0x(row.hash)}`}
                    underlink={
                      !isSimpleData ? Char.add0x(Char.ellipsisMiddle(row.hash)) : Char.add0x(Char.ellipsisEnd(row.hash))
                    }
                  ></LinkUnderline>
                </TableCell>

                <TableCell align="left" style={{ width: 200 }}>
                  <Time data={row.timestamp as number}></Time>
                </TableCell>

                {!isSimpleData && (
                  <TableCell align="left" style={{ width: 220 }} component="th" scope="row">
                    <LinkUnderline path={`/block/${row.blockHeight}`} underlink={row.blockHeight}></LinkUnderline>
                  </TableCell>
                )}

                {!isMobile ? (
                  <>
                    <TableCell style={{ width: '11%' }} align="left">
                      {TableCellAccount(row.from)}
                    </TableCell>

                    <TableCell align="left" style={{ textAlign: 'center', width: 100, padding: 0 }}>
                      <ArrowForwardIcon />
                    </TableCell>

                    <TableCell align="left" style={{ width: '14%' }}>
                      {TableCellAccount(row.to)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="center">
                      <div>{TableCellAccount(row.from)}</div>
                      <div>
                        <ArrowDownwardIcon />
                      </div>
                      <div>{TableCellAccount(row.to)}</div>
                    </TableCell>
                  </>
                )}

                <TableCell align="right" style={{ width: 200 }}>
                  {Char.hexToBalance(row.value.toString())} <span className="description">Barrel</span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Transactions;
