import { ChangeEvent, memo } from 'react';

import FormHelperText from '@mui/joy/FormHelperText';
import { FormControl, TextField } from '@mui/material';

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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input = memo(
  ({
    name,
    error,
    width = '80%',
    type,
    defaultValue,
    value,
    disabled,
    label,
    helperText,
    fullWidth,
    onChange,
    onBlur,
    placeholder
  }: Props) => {
    return (
      <Container>
        <FormControl sx={{ m: 1, width }} variant="standard">
          <TextField
            error={error}
            id="fullWidth"
            margin="normal"
            name={name}
            type={type}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e)}
            onBlur={(e) => onBlur && onBlur(e)}
          />
          <FormHelperText className={error ? 'error' : 'info'}>{helperText}</FormHelperText>
        </FormControl>
      </Container>
    );
  }
);

export default Input;
