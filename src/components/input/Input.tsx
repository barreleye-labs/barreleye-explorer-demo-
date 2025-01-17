import { memo } from 'react';

import FormHelperText from '@mui/joy/FormHelperText';
import { FormControl, TextField, TextFieldProps } from '@mui/material';

import { Container } from './styles';

interface Props {
  name?: string;
  type?: string;
  label?: string;
  defaultValue?: string | number;
  value?: string | number;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  width?: string;
  placeholder?: string;
  helperText?: string;
  onChange?: TextFieldProps['onChange'];
  onBlur?: TextFieldProps['onBlur'];
}
const Input = memo(({ name, error, width = '80%', helperText, ...props }: Props) => {
  return (
    <Container>
      <FormControl sx={{ m: 1, width }} variant="standard">
        <TextField error={error} id="fullWidth" margin="normal" name={name} {...props} />
        <FormHelperText className={error ? 'error' : 'info'}>{helperText}</FormHelperText>
      </FormControl>
    </Container>
  );
});

export default Input;
