import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CallMadeIcon from '@mui/icons-material/CallMade';
import { LoadingButton } from '@mui/lab';
import { CardContent, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { Card, CustomInput } from 'barrel-ui-kit';

import LinkUnderline from '@components/link';

import { Char, Crypto } from '@utils';

const Create = () => {
  const navigate = useNavigate();
  const [privateKey] = useState(Crypto.generatePrivateKey());
  const [address, setAddress] = useState<string>();
  const [step, setStep] = useState(1);

  useEffect(() => {
    getAddress();
  }, [privateKey]);

  async function getAddress() {
    const address = await Crypto.privateKeyToAddress(privateKey as string);
    setAddress(Char.add0x(address as string));
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            {step === 1 ? 'Please Set The Private Key' : 'Please save Your Wallet Key'}
          </Typography>
          <Typography sx={{ mb: 4 }} color="text.secondary">
            {step === 1
              ? 'If you want to generate a private key for your account, please click the button below.'
              : 'Your new account has been created.   Please copy and securely store the Wallet Key below.'}
          </Typography>

          {step === 1 && (
            <LoadingButton className="button" size="large" onClick={() => setStep(2)}>
              SET PRIVATE KEY
            </LoadingButton>
          )}
          {step === 2 && (
            <>
              <CustomInput defaultValue={privateKey} label="Private Key" isCopyBtn={true} disabled={true} />
              <CustomInput defaultValue={address} label="Address" isCopyBtn={true} disabled={true} />
            </>
          )}
        </CardContent>
      </Card>
      {step === 2 && (
        <Card custom onClick={() => navigate('/faucet')} background={'#e5fbf842'}>
          <CardContent>
            <Typography variant="h5">Click if you want to receive coins.</Typography>
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
      )}
    </>
  );
};

export default Create;
