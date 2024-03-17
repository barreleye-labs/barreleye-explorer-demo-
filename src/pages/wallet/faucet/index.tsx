import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import CallMadeIcon from '@mui/icons-material/CallMade';
import { LoadingButton } from '@mui/lab';
import { CardContent, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useSnackbar } from 'notistack';

import AccountService from '@services/account.ts';
import FaucetService from '@services/faucet';

import { FaucetRequest } from '@type/dto/transaction';

import useInput from '@hooks/useInput';

import Card from '@components/card';
import { Input } from '@components/input';
import LinkUnderline from '@components/link';

import { Char } from '@utils';

import { BTN_TYPE, buttonHandlerStore } from '@src/stores/index.ts';

const Faucet = () => {
  console.count('faucet');
  const loading = buttonHandlerStore((state) => state.loadingFaucet);
  const setLoading = buttonHandlerStore((state) => state.setLoading);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [faucet, onChange] = useInput<FaucetRequest & { balance: number }>({ accountAddress: '', balance: 0 });
  const { accountAddress, balance } = faucet;
  const { data, mutate } = AccountService().GetOneById(accountAddress);

  const showToast = useCallback(({ variant, message }: { variant: 'success' | 'error'; message: string }) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' }
    });
  }, []);

  const onBlur = useCallback((value) => {
    mutate();
    console.log(value);
  });

  const onSubmit = useCallback(async () => {
    const { error } = await FaucetService().Send({
      accountAddress: Char.remove0x(accountAddress)
    });

    if (error) return showToast({ variant: 'error', message: 'Invalid address format.\n' });

    setLoading(BTN_TYPE.FAUCET);

    setTimeout(() => {
      setLoading(BTN_TYPE.FAUCET);

      showToast({ variant: 'success', message: 'Your Barrel Faucet request accepted.' });
    }, 13000);
  }, [accountAddress, balance]);
  const disabled = useMemo(() => !accountAddress, [accountAddress]);
  return (
    <>
      <Card>
        <CardContent>
          <>
            <Typography variant="h5" sx={{ mb: 1.5 }}>
              Barrel Faucet
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              You can receive 10 Barrel through the faucet.
            </Typography>

            <Input
              fullWidth
              label="Account Address"
              value="accountAddress"
              placeholder="Please put your wallet address here"
              name="accountAddress"
              disabled={loading}
              onChange={onChange}
              onBlur={onBlur}
            />
            <Input
              label="Barrel Balance"
              name="balance"
              value="balance"
              type="number"
              placeholder="0.000000"
              disabled={true}
              defaultValue={data}
              fullWidth
              onChange={onChange}
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
