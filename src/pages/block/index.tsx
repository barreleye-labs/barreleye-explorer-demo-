import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import FilterNoneIcon from '@mui/icons-material/FilterNone';
import Skeleton from '@mui/material/Skeleton';
import useBlocksQuery from '@queries/useBlocksQuery';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Button } from '@pages/blocks/styles';

import Detail from '@components/detail';
import LinkUnderline from '@components/link';
import Row from '@components/row';

import { Char, Time } from '@utils';

function Block() {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const location = useLocation();
  const { height } = useParams();

  const { data } = useBlocksQuery().GetOneById(height as string);
  const { data: lastBlock } = useBlocksQuery().GetLast();

  const changeBlockPage = useCallback(
    (setHeight: number) => {
      if (setHeight >= 0 && lastBlock!.block.height >= setHeight) {
        navigate(`/block/${setHeight}`);
      }
    },
    [lastBlock, navigate]
  );

  const getTxHashLink = useCallback((hash: string) => {
    return <LinkUnderline key={hash} path={`/transaction/${Char.add0x(hash)}`} underlink={Char.add0x(hash)} />;
  }, []);

  const setTime = useCallback(() => {
    const formatUnix = Time.formatUnixNano(data!.block.timestamp);
    const formatUtc = Time.formatUtc(formatUnix);
    const elapsedTime = Time.elapsedTime(formatUnix);
    return `${elapsedTime} (${formatUtc} +UTC)`;
  }, [data]);

  return (
    <Detail
      onClickPrev={() => changeBlockPage(Number(height) - 1)}
      onClickAfter={() => changeBlockPage(Number(height) + 1)}
      icon={<FilterNoneIcon />}
      title={location.pathname.split('/')[1].toUpperCase()}
      subheader={height as string}
      isAction={true}
    >
      <>
        {!data ? (
          <>
            {[...new Array(3)].map((_, index) => {
              return <Skeleton key={index} />;
            })}
          </>
        ) : (
          <>
            <Row label="Time" content={setTime()}></Row>
            <Row label="Hash" content={Char.add0x(data?.block.hash)}></Row>
            <Row label="Prev Hash" content={Char.add0x(data?.block.prevBlockHash)}></Row>
            <Row label="Total TXs" content={`${data?.block.txCount.toString()} TXs`}>
              {data?.block.txCount > 0 ? data?.block.transactions.map((hash: string) => getTxHashLink(hash)) : ''}
            </Row>
            <Row label="Block Reward" content="10 Barrel"></Row>
            <Row label="Version" content={data?.block.version}></Row>
            <Row label="Datahash" content={Char.add0x(data?.block.dataHash)}></Row>
            <Row label="Extra">
              <Button
                onClick={() => navigate(`/account/${Char.add0x(data?.block.signer)}`)}
                size="small"
                variant="outlined"
              >
                {data?.block.extra}
              </Button>
            </Row>
            <Row label="Block producer" content={Char.add0x(data?.block.signer)}></Row>
          </>
        )}
      </>
    </Detail>
  );
}

export default Block;
