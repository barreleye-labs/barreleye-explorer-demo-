import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CallMadeIcon from '@mui/icons-material/CallMade';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { useSnackbar } from 'notistack';

import AccountService from '@services/account';
import TransactionsService from '@services/transactions';

import { Signature } from '@type/dto/signature';
import { TransactionRequest } from '@type/dto/transaction';

import useInput from '@hooks/useInput';

import Card from '@components/card';
import { PrivateForm } from '@components/form';
import { Input } from '@components/input';
import LinkUnderline from '@components/link';

import { Char, Crypto } from '@utils';

import { BTN_TYPE, buttonHandlerStore, commonPrivateKeyStore } from '@src/stores';

const txDefaultData = (): TransactionRequest => {
  return {
    nonce: '',
    from: '',
    to: '',
    value: '',
    data: 'ab'
  };
};

const Transfer = () => {
  const loading = buttonHandlerStore((state) => state.loadingTransfer);
  const setLoading = buttonHandlerStore((state) => state.setLoading);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const commonAddress = commonPrivateKeyStore((state) => state.address);
  const commonPrivateKey = commonPrivateKeyStore((state) => state.privateKey);

  const [tx, onChange, setTx] = useInput<TransactionRequest>(txDefaultData());
  const [balance, setBalance] = useState<string>();
  const [step, setStep] = useState(commonPrivateKey ? 2 : 1);
  const [privateKey, onChangePrivateKey, setPrivateKey] = useInput('');

  const initData = useCallback(() => {
    setTx(txDefaultData());
    setStep(1);
    setPrivateKey('');
  }, []);

  useEffect(() => {
    if (commonPrivateKey) {
      setTx({ ...tx, from: commonAddress });
      setPrivateKey(commonPrivateKey);
      fetchAccount();
    }
  }, []);

  const showToast = useCallback(({ variant, message }: { variant: 'success' | 'error'; message: string }) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' }
    });
  }, []);

  const getSigner = useCallback(() => Crypto.generatePublicKey(privateKey), [privateKey]);

  const getSignature = useCallback(
    (nonce: string): Signature => {
      const { from, to, value, data } = tx;

      const sig: TransactionRequest = {
        nonce,
        from: Char.remove0x(from),
        to: Char.remove0x(to),
        value: Char.numberToHex(Number(value)),
        data
      };

      const txUintArray = new Uint8Array(
        Object.keys(sig).reduce((acc: number[], key: string) => acc.concat(...Char.hexToUint8Array(sig[key])), [])
      );

      const message = Char.uint8ArrayToHex(txUintArray);
      return Crypto.signMessage(message, privateKey);
    },
    [privateKey, tx]
  );

  async function fetchAccount(address = commonAddress) {
    const { data, error: accountError } = await AccountService().GetOneById(address);

    if (accountError) return setBalance(0);

    const { nonce, balance } = data.account;

    setTx((tx) => ({ ...tx, nonce }));
    setBalance(Char.hexToBalance(balance));
  }

  const sendTransaction = useCallback(async () => {
    const { r, s } = getSignature(tx.nonce);
    const { x, y } = getSigner();

    const { error: transactionsError } = await TransactionsService().Send({
      ...tx,
      value: Char.add0x(Char.numberToHex(Number(tx.value))),
      to: Char.remove0x(tx.to),
      signatureR: r,
      signatureS: s,
      signerX: x,
      signerY: y
    });

    if (transactionsError)
      return showToast({ variant: 'error', message: 'Insufficient balance. You can receive coins through faucet.' });

    setLoading(BTN_TYPE.TRANSFER);
    setTimeout(() => {
      showToast({ variant: 'success', message: 'Transaction transfer was successful!' });
      fetchAccount();
      !commonPrivateKey && initData();
      setLoading(BTN_TYPE.TRANSFER);
    }, 13000);
  }, [tx]);

  const isValidAddress = (): boolean => {
    let isValid = true;

    if (tx.from === Char.remove0x(tx.to)) {
      isValid = false;
      showToast({ variant: 'error', message: 'Cannot send to the same address.' });
      return isValid;
    }

    if (!Char.isAddress(tx.to)) {
      showToast({ variant: 'error', message: 'Check your address format' });
      isValid = false;
      return isValid;
    }

    return isValid;
  };

  const onSubmit = useCallback(async () => {
    if (step === 1) {
      const from = await Crypto.privateKeyToAddress(privateKey);

      setTx({ ...tx, from: from as string });
      await fetchAccount(from);

      return setStep(2);
    }

    if (isValidAddress()) await sendTransaction();
  }, [privateKey, tx, step]);

  const disabled = useMemo(() => (step === 1 ? !privateKey : !tx.to || !tx.value), [tx, step, privateKey]);
  return (
    <>
      {step === 1 && !commonPrivateKey ? (
        <PrivateForm
          title="Enter an acceptable private key."
          sub="Please enter the private key to sign the transaction."
          defaultValue={privateKey}
          disabled={loading}
          loading={loading}
          onChange={(e) => onChangePrivateKey(e)}
          onClick={onSubmit}
        />
      ) : (
        <>
          <Card>
            <CardContent>
              <>
                {step === 2 && (
                  <Button className="return" onClick={() => setStep(1)}>
                    <ArrowBackIosNewIcon />
                    Back
                  </Button>
                )}
                <div className="input-wrapper">
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Enter the information
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Please enter the information required to send the transaction. And try sending the transaction.
                  </Typography>
                  <Input
                    label="From Address"
                    helperText={`Account Balance: ${balance} Barrel.`}
                    disabled={true}
                    value={Char.add0x(tx.from)}
                  />

                  <Input label="To Address" name="to" onChange={onChange} value={tx.to} />
                  <Input
                    name="value"
                    value={tx.value}
                    onChange={onChange}
                    type="number"
                    label="Amount to Send"
                    placeholder="0"
                  />
                </div>
              </>

              <CardActions>
                <span className="info">{loading && 'Please wait up to 13 seconds'}</span>

                <LoadingButton loading={loading} disabled={disabled} className="button" size="large" onClick={onSubmit}>
                  Send Transaction
                </LoadingButton>
              </CardActions>
            </CardContent>
          </Card>

          <Card custom onClick={() => navigate('/faucet')} background={'#e5fbf842'}>
            <CardContent>
              <Typography variant="h5">Click if your balance is insufficient!</Typography>
              <span className="link">
                <LinkUnderline underlink="You need to use the faucet service to get a Barrel." />
              </span>
            </CardContent>

            <CardActions className="wrapper">
              <div className="icon-wrapper">
                <CallMadeIcon />
              </div>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
};

export default Transfer;
