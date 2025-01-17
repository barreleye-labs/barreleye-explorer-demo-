import { useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { commonPrivateKeyStore } from '@stores';

import useInput from '@hooks/useInput';

import Card from '@components/card';
import { CustomInput } from '@components/input';

import { Crypto } from '@utils';

interface Props {
  title: string;
  sub: string;
  disabled?: boolean;
  loading?: boolean;
  onNext: ({ privateKey, address }: { privateKey: string; address: string }) => void;
}
const PrivateForm = ({ title, loading, sub, onNext }: Props) => {
  const { address: commonAddress, privateKey: commonPrivateKey } = commonPrivateKeyStore();
  const [privateKey, onChangePrivateKey] = useInput('');

  const onSubmit = async () => {
    const address = await Crypto.privateKeyToAddress(privateKey);
    onNext({ privateKey, address });
  };

  useEffect(() => {
    if (commonPrivateKey) {
      onNext({ privateKey: commonPrivateKey, address: commonAddress });
    }
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {sub}
        </Typography>

        <CustomInput
          label="Private Key"
          placeholder="Enter the private key"
          defaultValue={privateKey}
          onChange={onChangePrivateKey}
        />
        <CardActions>
          <LoadingButton
            loading={loading}
            disabled={privateKey.length < 1}
            className="button"
            size="large"
            onClick={onSubmit}
          >
            Access
          </LoadingButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PrivateForm;
