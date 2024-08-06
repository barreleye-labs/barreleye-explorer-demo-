import { ChangeEvent } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';

import Card from '@components/card';
import { CustomInput } from '@components/input';

interface Props {
  title: string;
  sub: string;
  defaultValue: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (e: ChangeEvent) => void;
  onClick?: () => void;
}
const PrivateForm = ({ title, loading, sub, defaultValue, disabled, onChange, onClick }: Props) => {
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
          defaultValue={defaultValue}
          onChange={(e) => onChange && onChange(e)}
        />
        <CardActions>
          <LoadingButton
            loading={loading}
            disabled={defaultValue.length < 1}
            className="button"
            size="large"
            onClick={onClick}
          >
            Access
          </LoadingButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PrivateForm;
