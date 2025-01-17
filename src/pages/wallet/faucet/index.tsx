import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CallMadeIcon from '@mui/icons-material/CallMade';
import { LoadingButton } from '@mui/lab';
import { CardContent, Typography, debounce } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import useAccountQuery from '@queries/useAccountQuery';
import { BTN_TYPE, buttonHandlerStore } from '@stores';

import FaucetService from '@services/faucet';

import useToast from '@hooks/useToast';

import Card from '@components/card';
import { Input } from '@components/input';
import LinkUnderline from '@components/link';

import { Char } from '@utils';

const Faucet = () => {
  const { loadingFaucet, setLoading } = buttonHandlerStore();
  const navigate = useNavigate();
  const showToast = useToast();

  const [accountAddress, setAccountAddress] = useState<string>('');
  const [isEnoughBalanceError, setIsBalanceEnoughError] = useState<boolean>(false);
  const { data, refetch } = useAccountQuery(accountAddress, { enabled: false });

  const validateBalance = (balance: string): boolean => {
    return Number(Char.hexToDecimal(balance)) >= 10;
  };

  useEffect(() => {
    setIsBalanceEnoughError(data ? validateBalance(data.account.balance) : false);
  }, [data?.account.balance]);

  useEffect(() => {
    accountAddress && refetch();
  }, [accountAddress]);

  const onChange = debounce((e) => {
    const address = e.target.value;
    setAccountAddress(address);
  }, 500);

  const onSubmit = useCallback(async () => {
    const { error } = await FaucetService().Send({
      accountAddress: Char.remove0x(accountAddress)
    });

    if (error) {
      return error.message === 'faucet time limit'
        ? showToast({ variant: 'error', message: 'faucet can only be used once per hour.\n' })
        : showToast({ variant: 'error', message: 'Invalid address format.\n' });
    }

    setLoading(BTN_TYPE.FAUCET);

    setTimeout(async () => {
      setLoading(BTN_TYPE.FAUCET);

      showToast({ variant: 'success', message: 'Your Barrel Faucet request accepted.' });

      await refetch();
    }, 13000);
  }, [accountAddress]);

  const disabled = useMemo(() => !accountAddress || isEnoughBalanceError, [accountAddress, isEnoughBalanceError]);

  return (
    <>
      <Card>
        <CardContent>
          <>
            <Typography variant="h5" sx={{ mb: 1.5 }}>
              Barrel Faucet
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              You can receive 5 Barrel through the faucet.
            </Typography>

            <Input
              fullWidth
              label="Account Address"
              placeholder="Please put your wallet address here"
              name="accountAddress"
              disabled={loadingFaucet}
              onChange={onChange}
            />
            <Input
              error={isEnoughBalanceError}
              helperText={
                isEnoughBalanceError ? 'The account already has sufficient balance of more than 10 Barrel.' : ''
              }
              label="Barrel Balance"
              name="balance"
              placeholder="0.000000"
              disabled={true}
              value={data?.account.balance ? Char.hexToBalance(data.account.balance) : '0'}
              fullWidth
            />
          </>

          <CardActions>
            <span className="info">{loadingFaucet && 'Please wait up to 13 seconds'}</span>

            <LoadingButton
              loading={loadingFaucet}
              disabled={disabled}
              className="button"
              size="large"
              onClick={onSubmit}
            >
              Run Faucet
            </LoadingButton>
          </CardActions>
        </CardContent>
      </Card>

      <Card custom onClick={() => navigate('/transfer')} background={'#e5fbf842'}>
        <CardContent>
          <Typography variant="h5">Click to transfer the Barrel.</Typography>
          <span className="link">
            <LinkUnderline underlink="You need to use the send Barrel service to transfer Barrel" />
          </span>
        </CardContent>
        <CardActions className="wrapper">
          <div className="icon-wrapper">
            <CallMadeIcon />
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default Faucet;
