import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AccessAlarm,
  AccessTime,
  Flag,
  KeyboardArrowRight,
  Polyline,
  ReceiptLong,
  ViewInAr
} from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { BlocksService, TransactionsService } from '@services';
import { TextLogo } from 'barrel-ui-kit';

import Blocks from '@pages/blocks';
import Transactions from '@pages/transactions';

import Link from '@components/link';

import { Char } from '@utils';

import nodesConfig from '@config/nodeConfig';

import { Card, Container, DashboardTable, Highlight } from './styles';

const Dashboard = () => {
  const navigate = useNavigate();

  const { data } = BlocksService().GetAll({ size: 7, page: 1 });
  const { data: txData } = TransactionsService().GetAll({ size: 7, page: 1 });

  const BlockHeightCard = useCallback(() => {
    const height = Number(data?.totalCount) - 1;
    return (
      <Highlight>
        <Link onClick={() => navigate(`/block/${height}`)}>
          <h2>#{data ? height : '0'}</h2>
        </Link>
      </Highlight>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const SupplyCard = useCallback(() => {
    return (
      <Highlight>
        <h2>
          {data ? ((Number(data.totalCount) - 1) * 10).toLocaleString('ko-KR') : '0'}
          <span>Barrel</span>
        </h2>
      </Highlight>
    );
  }, [data]);

  const BlockProposerCard = useCallback(() => {
    const extra = data ? data.blocks[0].extra : '-';
    return (
      <Highlight>
        <Link
          onClick={() =>
            navigate(
              data
                ? `/account/${Char.add0x(nodesConfig[`${extra}Config` as keyof typeof nodesConfig].ADDRESS)}`
                : `/account`
            )
          }
        >
          <h2 style={{ fontSize: '22px' }}>{extra.toUpperCase()}</h2>
        </Link>
      </Highlight>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const TotalTxCountCard = useCallback(() => {
    return (
      <Highlight>
        <Link onClick={() => navigate(`/transactions`)}>
          <h2>{txData ? txData.totalCount : '0'}</h2>
        </Link>
      </Highlight>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txData]);

  return (
    <Container>
      <Grid container spacing={2} className="margin-spacing">
        <Grid xs={12} sm={6} md={2.8}>
          <Card>
            <div className="wrapper">
              <div className="icon-wrapper ">
                <ViewInAr />
              </div>
              <div>
                <BlockHeightCard />
                <h4>Block Height</h4>
              </div>
            </div>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3.7}>
          <Card>
            <div className="wrapper">
              <div className="icon-wrapper">
                <AccessTime />
              </div>
              <div>
                <SupplyCard />
                <h4>Circulating Supply</h4>
              </div>
            </div>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={2.75}>
          <Card>
            <div className="wrapper">
              <div className="icon-wrapper ">
                <AccessAlarm />
              </div>
              <div>
                <h2>
                  10<span>S</span>
                </h2>
                <h4>Avg Block Time</h4>
              </div>
            </div>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={2.75}>
          <Card>
            <div className="wrapper">
              <div className="icon-wrapper ">
                <Polyline />
              </div>
              <div>
                <Highlight>
                  <Link onClick={() => navigate('/nodes')}>
                    <h2>3</h2>
                  </Link>
                </Highlight>
                <h4>Consensus Nodes</h4>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="margin-spacing">
        <Grid xs={12} sm={12} md={6.5} className="signature-height">
          <Card>
            <div className="signature">
              <img src="src/assets/barreleye.png" />
              <TextLogo bold="Barreleye" semi="scan" onClick={() => navigate('/')} />
            </div>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={2.75} className="signature-height">
          <Card>
            <div className="wrapper">
              <div className="icon-wrapper ">
                <Flag />
              </div>
              <div>
                <BlockProposerCard />
                <h4>Current Block Proposer</h4>
              </div>
            </div>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={2.75} className="signature-height">
          <Card>
            <div className="wrapper">
              <div className="icon-wrapper ">
                <ReceiptLong />
              </div>
              <div>
                <TotalTxCountCard />
                <h4>Total Tx Count</h4>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} className=" margin-spacing">
        <Grid xs={16} md={5} className="blocks-table">
          <Card>
            <DashboardTable className="blocks-table">
              <div>
                <div className="header">
                  <h2>Recent Blocks</h2>

                  <Link underlink="View All" onClick={() => navigate('/blocks')}>
                    <KeyboardArrowRight />
                  </Link>
                </div>
                <Blocks isSimpleData={true} isPagination={false} size={7} />
              </div>
            </DashboardTable>
          </Card>
        </Grid>

        <Grid xs={16} md={7}>
          <Card>
            <DashboardTable>
              <div>
                <div className="header">
                  <h2>Recent Transactions</h2>
                  <Link underlink="View All" onClick={() => navigate('/transactions')}>
                    <KeyboardArrowRight />
                  </Link>
                </div>
                <Transactions isSimpleData={true} isPagination={false} size={7} />
              </div>
            </DashboardTable>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Dashboard;
