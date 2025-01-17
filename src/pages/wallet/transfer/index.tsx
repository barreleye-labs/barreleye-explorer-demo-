import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CallMadeIcon from '@mui/icons-material/CallMade';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import useAccountQuery from '@queries/useAccountQuery';
import useTransactionsQuery from '@queries/useTransactionsQuery';
import { BTN_TYPE, buttonHandlerStore, commonPrivateKeyStore } from '@stores';

import { TransactionRequest } from '@type/dto/transaction';

import useInput from '@hooks/useInput';
import useSignature from '@hooks/useSignature';
import useToast from '@hooks/useToast';

import Card from '@components/card';
import { PrivateForm } from '@components/form';
import { Input } from '@components/input';
import LinkUnderline from '@components/link';

import { Char, Crypto } from '@utils';

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
  const showToast = useToast();

  const { loadingTransfer, setLoading } = buttonHandlerStore();

  const { address: commonAddress, privateKey: commonPrivateKey } = commonPrivateKeyStore();

  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState('');
  const [tx, onChange, setTx] = useInput<TransactionRequest>(txDefaultData());
  const [step, setStep] = useState(1);
  const { data: accountInfo, refetch: fetchAccount } = useAccountQuery(address, { enabled: false });
  const { mutateAsync: sendTransaction } = useTransactionsQuery().Send();
  const init = useCallback(() => {
    setTx(txDefaultData());
    setStep(1);
    setPrivateKey('');
  }, [setPrivateKey, setTx]);

  const updateState = (from: string = commonAddress) => {
    setTx((tx) => ({ ...tx, nonce: accountInfo?.account.nonce ?? '0', from }));
  };

  const getSigner = useCallback(() => Crypto.generatePublicKey(privateKey), [privateKey]);
  const getSignature = useSignature(privateKey, tx);

  const createTxInfo = () => {
    const { r, s } = getSignature();
    const { x, y } = getSigner();

    return {
      ...tx,
      value: Char.add0x(Char.numberToHex(Number(tx.value))),
      to: Char.remove0x(tx.to),
      signatureR: r,
      signatureS: s,
      signerX: x,
      signerY: y
    };
  };

  const onSubmit = useCallback(async () => {
    if (!isValidAddress()) return;

    try {
      await sendTransaction(createTxInfo());

      setLoading(BTN_TYPE.TRANSFER);
      setTimeout(async () => {
        if (commonPrivateKey) {
          await fetchAccount();
        } else {
          init();
        }

        showToast({ variant: 'success', message: 'Transaction transfer was successful!' });

        setLoading(BTN_TYPE.TRANSFER);
      }, 13000);
    } catch (error) {
      showToast({ variant: 'error', message: 'Insufficient balance. You can receive coins through faucet.' });
    }
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

    const balance = Char.hexToDecimal(accountInfo!.account.balance);

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

  useEffect(() => {
    if (privateKey) {
      fetchAccount();
    }
  }, [privateKey]);

  useEffect(() => {
    updateState(accountInfo?.account.address);
  }, [accountInfo]);

  const onNext = async (privateKeyStore: { privateKey: string; address: string }) => {
    const { privateKey, address } = privateKeyStore;
    setAddress(address);
    setPrivateKey(privateKey);

    setStep(2);
  };

  const disabled = useMemo(() => (step === 1 ? !privateKey : !tx.to || !tx.value), [tx, step, privateKey]);

  return (
    <>
      {step === 1 && (
        <PrivateForm
          title="Enter an acceptable private key."
          sub="Please enter the private key to sign the transaction."
          disabled={loadingTransfer}
          loading={loadingTransfer}
          onNext={(privateKeyStore) => onNext(privateKeyStore)}
        />
      )}

      {step === 2 && privateKey && (
        <>
          <Card>
            <CardContent>
              {!commonPrivateKey && <PrevButton onClick={() => setStep(1)} />}

              <div className="input-wrapper">
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  Enter the information
                </Typography>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  Please enter the information required to send the transaction. And try sending the transaction.
                </Typography>

                <FromField value={address} balance={accountInfo?.account.balance ?? '0'} />
                <ToField value={tx.to} onChange={onChange} />
                <ValueField value={tx.value} onChange={onChange} />
              </div>
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

          <Banner />
        </>
      )}
    </>
  );
};

const PrevButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="return" onClick={onClick}>
      <ArrowBackIosNewIcon />
      Back
    </Button>
  );
};

const FromField = ({ value, balance }: { value: string; balance: string }) => {
  return (
    <Input
      label="From Address"
      helperText={`Account Balance: ${Char.hexToBalance(balance)} Barrel.`}
      disabled={true}
      value={Char.add0x(value)}
    />
  );
};

const ToField = ({ value, onChange }: { value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  return <Input label="To Address" name="to" onChange={onChange} value={value} />;
};

const ValueField = ({
  value,
  onChange
}: {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <Input name="value" value={value} onChange={onChange} type="number" label="Amount to Send" placeholder="0" />;
};

const Banner = () => {
  const navigate = useNavigate();
  return (
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
  );
};
export default Transfer;
