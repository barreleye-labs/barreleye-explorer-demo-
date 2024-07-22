import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CallMadeIcon from '@mui/icons-material/CallMade';
import { LoadingButton } from '@mui/lab';
import { CardContent, Typography, debounce } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useSnackbar } from 'notistack';

import AccountService from '@services/account.ts';
import FaucetService from '@services/faucet';

import Card from '@components/card';
import { Input } from '@components/input';
import LinkUnderline from '@components/link';

import { Char } from '@utils';

import { BTN_TYPE, buttonHandlerStore } from '@src/stores/index.ts';

const Faucet = () => {
  const loading = buttonHandlerStore((state) => state.loadingFaucet);
  const setLoading = buttonHandlerStore((state) => state.setLoading);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [accountAddress, setAccountAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [isBalanceEnoughError, setIsBalanceEnoughError] = useState<boolean>(false);

  const showToast = useCallback(({ variant, message }: { variant: 'success' | 'error'; message: string }) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAccount = async (address = accountAddress) => {
    setIsBalanceEnoughError(false);

    const { data, error } = await AccountService().GetOneById(Char.remove0x(address));

    if (error) {
      return setBalance('0');
    }

    const balance: string = data.account.balance;
    setBalance(Char.hexToBalance(balance));

    if (Number(Char.hexToDecimal(balance)) >= 10) setIsBalanceEnoughError(true);
  };

  const onValidCheck = debounce(async (e) => {
    if (e.target.value) {
      setAccountAddress(e.target.value);
      fetchAccount(e.target.value);
    }
  }, 500);

  const onSubmit = useCallback(async () => {
    const { error } = await FaucetService().Send({
      accountAddress: Char.remove0x(accountAddress)
    });

    if (error) {
      if (error.message === 'faucet time limit')
        return showToast({ variant: 'error', message: 'faucet can only be used once per hour.\n' });

      return showToast({ variant: 'error', message: 'Invalid address format.\n' });
    }

    setLoading(BTN_TYPE.FAUCET);

    setTimeout(() => {
      setLoading(BTN_TYPE.FAUCET);

      showToast({ variant: 'success', message: 'Your Barrel Faucet request accepted.' });

      fetchAccount();
    }, 13000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountAddress]);

  const disabled = useMemo(() => !accountAddress || isBalanceEnoughError, [accountAddress, isBalanceEnoughError]);

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
              disabled={loading}
              onChange={onValidCheck}
            />
            <Input
              error={isBalanceEnoughError}
              helperText={isBalanceEnoughError && 'The account already has sufficient balance of more than 10 Barrel.'}
              label="Barrel Balance"
              name="balance"
              placeholder="0.000000"
              disabled={true}
              value={balance}
              fullWidth
            />
          </>

          <CardActions>
            <span className="info">{loading && 'Please wait up to 13 seconds'}</span>

            <LoadingButton loading={loading} disabled={disabled} className="button" size="large" onClick={onSubmit}>
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
