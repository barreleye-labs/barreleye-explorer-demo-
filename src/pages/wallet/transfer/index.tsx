import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CallMadeIcon from '@mui/icons-material/CallMade';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import AccountService from '@services/account';
import TransactionsService from '@services/transactions';

import { TransactionRequest } from '@type/dto/transaction';

import useInput from '@hooks/useInput';
import useSignature from '@hooks/useSignature.ts';
import useToast from '@hooks/useToast.ts';

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
  const navigate = useNavigate();
  const showToast = useToast();

  const { loadingTransfer, setLoading } = buttonHandlerStore();

  const { address: commonAddress, privateKey: commonPrivateKey } = commonPrivateKeyStore();

  const [tx, onChange, setTx] = useInput<TransactionRequest>(txDefaultData());
  const [balance, setBalance] = useState<string>();
  const [step, setStep] = useState(commonPrivateKey ? 2 : 1);
  const [privateKey, onChangePrivateKey, setPrivateKey] = useInput('');

  const getSigner = useCallback(() => Crypto.generatePublicKey(privateKey), [privateKey]);
  const getSignature = useSignature(privateKey, tx);

  const initData = useCallback(() => {
    setTx(txDefaultData());
    setStep(1);
    setPrivateKey('');
  }, [setPrivateKey, setTx]);

  useEffect(() => {
    if (commonPrivateKey) {
      setPrivateKey(commonPrivateKey);

      const fetchData = async () => {
        const { nonce, balance } = await fetchAccount(commonAddress);
        setTx((tx) => ({ ...tx, nonce, from: commonAddress }));
        setBalance(() => Char.hexToBalance(balance));
      };

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAccount(address = commonAddress): Promise<{ nonce: string; balance: string; address: string }> {
    const { data, error } = await AccountService().GetOneById(address);

    if (error) return { balance: '0', nonce: '0', address: '' };

    return data.account;
  }

  const sendTransaction = useCallback(async () => {
    const { r, s } = getSignature(tx.nonce);
    const { x, y } = getSigner();

    const { error } = await TransactionsService().Send({
      ...tx,
      value: Char.add0x(Char.numberToHex(Number(tx.value))),
      to: Char.remove0x(tx.to),
      signatureR: r,
      signatureS: s,
      signerX: x,
      signerY: y
    });

    if (error)
      return showToast({ variant: 'error', message: 'Insufficient balance. You can receive coins through faucet.' });

    setLoading(BTN_TYPE.TRANSFER);
    setTimeout(async () => {
      showToast({ variant: 'success', message: 'Transaction transfer was successful!' });

      const { nonce, balance, address } = await fetchAccount(tx.from);

      if (commonPrivateKey) {
        setTx((tx) => ({ ...tx, nonce, from: address }));
        setBalance(Char.hexToBalance(balance));
      } else {
        initData();
      }

      setLoading(BTN_TYPE.TRANSFER);
    }, 13000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tx]);

  const isValidAddress = (): boolean => {
    if (tx.from === Char.remove0x(tx.to)) {
      showToast({ variant: 'error', message: 'Cannot send to the same address.' });
      return false;
    }

    if (!Char.isAddress(tx.to)) {
      showToast({ variant: 'error', message: 'Check your address format' });
      return false;
    }

    if (balance === '0') {
      showToast({ variant: 'error', message: 'Insufficient balance. You can receive coins through faucet.' });
      return false;
    }

    if (parseFloat(balance!.replace(/,/g, '')) < Number(tx.value)) {
      showToast({ variant: 'error', message: 'Check your balance' });
      return false;
    }

    return true;
  };

  const onSubmit = useCallback(async () => {
    if (step === 1) {
      const from = await Crypto.privateKeyToAddress(privateKey);
      const { nonce, balance } = await fetchAccount(from);

      setTx((tx) => ({ ...tx, nonce, from }));
      setBalance(Char.hexToBalance(balance));
      setStep(2);

      return;
    }

    if (step === 2 && isValidAddress()) {
      await sendTransaction();
    }
  }, [privateKey, tx, step]);

  const disabled = useMemo(() => (step === 1 ? !privateKey : !tx.to || !tx.value), [tx, step, privateKey]);
  return (
    <>
      {step === 1 && !commonPrivateKey ? (
        <PrivateForm
          title="Enter an acceptable private key."
          sub="Please enter the private key to sign the transaction."
          defaultValue={privateKey}
          disabled={loadingTransfer}
          loading={loadingTransfer}
          onChange={(e) => onChangePrivateKey(e)}
          onClick={onSubmit}
        />
      ) : (
        <>
          <Card>
            <CardContent>
              <>
                {step === 2 && !commonPrivateKey && (
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
                <span className="info">{loadingTransfer && 'Please wait up to 13 seconds'}</span>

                <LoadingButton
                  loading={loadingTransfer}
                  disabled={disabled}
                  className="button"
                  size="large"
                  onClick={onSubmit}
                >
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
