import { useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import Skeleton from '@mui/material/Skeleton';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import transactions from '@services/transactions';

import Detail from '@components/detail';
import LinkUnderline from '@components/link';
import Row from '@components/row';

import { Char, Time } from '@utils';

import { Container } from './styles';

function Transaction() {
  dayjs.extend(utc);

  const location = useLocation();
  const { hash } = useParams();

  const { data } = transactions().GetOneById(Char.remove0x(hash as string));

  const setTime = useCallback(() => {
    const formatUnix = Time.formatUnixNano(data?.transaction.timestamp as number);
    const formatUtc = Time.formatUtc(formatUnix);
    const elapsedTime = Time.elapsedTime(formatUnix);
    return `${elapsedTime} (${formatUtc} +UTC)`;
  }, [data]);

  return (
    <Container>
      <Detail
        icon={<FilterNoneIcon />}
        title={location.pathname.split('/')[1].toUpperCase()}
        subheader={Char.ellipsisMiddle(hash as string)}
      >
        {!data ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <Row label="TX Hash" content={hash}></Row>
            <Row label="TX Type" content="Transfer"></Row>
            <Row label="Block">
              <LinkUnderline
                path={`/block/${data.transaction.blockHeight}`}
                underlink={data.transaction.blockHeight}
              ></LinkUnderline>
            </Row>
            <Row label="TxReceipt Status">
              <div className="badge">
                <CheckCircleIcon />
                <span>Success</span>
              </div>
            </Row>
            <Row label="Age" content={setTime()}></Row>
            <Row label="From">
              <LinkUnderline
                key={data.transaction.from}
                path={`/account/${Char.add0x(data.transaction.from)}`}
                underlink={Char.add0x(data.transaction.from)}
              ></LinkUnderline>
            </Row>
            <Row label="To">
              <LinkUnderline
                key={data.transaction.to}
                path={`/account/${Char.add0x(data.transaction.to)}`}
                underlink={Char.add0x(data.transaction.to)}
              ></LinkUnderline>
            </Row>

            <Row
              label="Value"
              content={`${Number(Char.hexToDecimal(data.transaction.value)).toLocaleString('ko-KR')} Barrel`}
            ></Row>
            <Row label="Signer PublicKey">
              <span> x: {Char.add0x(data.transaction.signer.x)}</span>
              <br />
              <span> y: {Char.add0x(data.transaction.signer.y)}</span>
            </Row>

            <Row label="Nonce">{Char.hexToDecimal(data.transaction.nonce)}</Row>
          </>
        )}
      </Detail>
    </Container>
  );
}

export default Transaction;
