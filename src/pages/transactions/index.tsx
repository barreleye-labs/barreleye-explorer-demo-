import { useCallback, useEffect, useMemo, useState } from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableCell from '@mui/material/TableCell';

import transactions from '@services/transactions';

import { Transaction } from '@type/dto/transaction';

import LinkUnderline from '@components/link';
import { SkeletonTable } from '@components/skeleton';
import { Table, TableBody, TableHead } from '@components/table';
import IntervalTimestamp from '@components/time';

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
    if (isMobile) {
      // mobile
      setMobile(true);
    } else {
      // desktop
      setMobile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.userAgent]);

  const [page, setPage] = useState(1);

  const { data } = transactions().GetAll({ page, size });

  const handleChange = (_, value: number) => {
    setPage(value);
  };

  const TableCellAccount = useCallback((value: string) => {
    return (
      <LinkUnderline
        path={`/account/${Char.add0x(value)}`}
        underlink={!isSimpleData ? Char.add0x(Char.ellipsis(value)) : Char.add0x(Char.ellipsis8(value))}
      ></LinkUnderline>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      !isSimpleData ? Char.add0x(Char.ellipsis(row.hash)) : Char.add0x(Char.ellipsis8(row.hash))
                    }
                  ></LinkUnderline>
                </TableCell>

                <TableCell align="left" style={{ width: 200 }}>
                  <IntervalTimestamp data={row.timestamp as number}></IntervalTimestamp>
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
