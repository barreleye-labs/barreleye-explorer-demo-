import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@hooks';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { LoadingButton } from '@mui/lab';
import { CardContent, Typography, debounce } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { AccountService, FaucetService } from '@services';
import { BTN_TYPE, buttonHandlerStore } from '@stores';
import { Card, Input } from 'barrel-ui-kit';

import LinkUnderline from '@components/link';

import { Char } from '@utils';

const Faucet = () => {
  const { loadingFaucet, setLoading } = buttonHandlerStore();
  const navigate = useNavigate();
  const showToast = useToast();

  const [accountAddress, setAccountAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [isEnoughBalanceError, setIsBalanceEnoughError] = useState<boolean>(false);

  const validateBalance = (balance: string): boolean => {
    return Number(Char.hexToDecimal(balance)) >= 10;
  };

  const getBalance = async (address = accountAddress) => {
    setIsBalanceEnoughError(false);

    const { data, error } = await AccountService().GetOneById(Char.remove0x(address));

    if (error) {
      return '0';
    }

    return data.account.balance;
  };

  const onChange = debounce(async (e) => {
    const address = e.target.value;
    if (address) {
      setAccountAddress(address);
      const balance = await getBalance(address);
      setBalance(Char.hexToBalance(balance));

      if (validateBalance(balance)) {
        setIsBalanceEnoughError(true);
      }
    }
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

      const balance = await getBalance(accountAddress);
      setBalance(Char.hexToBalance(balance));

      if (validateBalance(balance)) {
        setIsBalanceEnoughError(true);
      }
    }, 13000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              helperText={isEnoughBalanceError && 'The account already has sufficient balance of more than 10 Barrel.'}
              label="Barrel Balance"
              name="balance"
              placeholder="0.000000"
              disabled={true}
              value={balance}
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
