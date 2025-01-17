import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useBlocksQuery from '@queries/useBlocksQuery.ts';

import { Block } from '@type/dto/block';

import LinkUnderline from '@components/link';
import { SkeletonTable } from '@components/skeleton';
import { Table, TableBody, TableCell, TableHead } from '@components/table';
import IntervalTimestamp from '@components/time';

import { Char } from '@utils';

import { Button, TableRow } from './styles.tsx';

interface Props {
  isPagination: boolean;
  isSimpleData: boolean;
  size: number;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const Blocks = ({ isPagination = true, size = 10, isSimpleData = false }: Props) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const { data } = useBlocksQuery().GetAll({ page, size });

  const handleChange = useCallback(
    (_e: ChangeEvent, value: number) => {
      setPage(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const count = useMemo(() => (data ? Math.ceil(data.totalCount / size) : 1), [data]);

  return (
    <Table count={count} page={page} onChange={handleChange} isPagination={isPagination}>
      <TableHead>
        <TableRow>
          <TableCell>Block</TableCell>
          <TableCell align="left">Age</TableCell>
          <TableCell align="left">Total TXs</TableCell>
          <TableCell align="left">Block Proposer</TableCell>
          {!isSimpleData && <TableCell align="left">Block Hash</TableCell>}
          {!isSimpleData && <TableCell align="left">Parent Hash</TableCell>}
          <TableCell align="right">Reward</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!data ? (
          <SkeletonTable columns={isSimpleData ? 5 : 7} size={size} />
        ) : (
          data?.blocks.map((row: Block) => (
            <TableRow data-cy="block_items" key={row.height} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <LinkUnderline path={`/block/${row.height}`} underlink={row.height.toString()}></LinkUnderline>
              </TableCell>

              <TableCell align="left">
                <IntervalTimestamp data={row.timestamp}></IntervalTimestamp>
              </TableCell>

              <TableCell align="left">{row.txCount}</TableCell>

              <TableCell align="left">
                <HtmlTooltip
                  title={
                    <>
                      <Typography color="inherit">
                        <b>{row.extra}</b>
                      </Typography>
                      <em>({Char.add0x(row.signer)})</em>
                    </>
                  }
                >
                  <Button
                    onClick={() => navigate(`/account/${Char.add0x(row.signer)}`)}
                    size="small"
                    variant="outlined"
                  >
                    {row.extra}
                  </Button>
                </HtmlTooltip>
              </TableCell>

              {!isSimpleData && (
                <TableCell align="left">
                  <HtmlTooltip title={<em>{Char.add0x(row.hash)}</em>}>
                    <span>{Char.add0x(Char.ellipsisMiddle(row.hash))}</span>
                  </HtmlTooltip>
                </TableCell>
              )}

              {!isSimpleData && (
                <TableCell align="left">
                  <HtmlTooltip title={<em>{Char.add0x(row.prevBlockHash)}</em>}>
                    <span>{Char.add0x(Char.ellipsisMiddle(row.prevBlockHash))}</span>
                  </HtmlTooltip>
                </TableCell>
              )}

              <TableCell align="right">
                10 <span className="description">Barrel</span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default Blocks;
