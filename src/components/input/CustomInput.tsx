import { ChangeEvent, MouseEvent, memo, useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import Button from '@mui/material-next/Button';

import { Container } from './styles';

interface Props {
  defaultValue?: string;
  width?: string;
  label: string;
  placeholder?: string;
  isCopyBtn?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const COPY_TEXT = {
  DEFAULT: 'COPY',
  ACTIVE: 'COPIED!'
};
const CustomInput = memo(
  ({ width = '50%', defaultValue, label, isCopyBtn, disabled, placeholder, onChange }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState(COPY_TEXT.DEFAULT);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const onCopy = () => {
      setCopyButtonText(COPY_TEXT.ACTIVE);
      navigator.clipboard?.writeText(defaultValue as string);

      setTimeout(() => {
        setCopyButtonText(COPY_TEXT.DEFAULT);
      }, 1000);
    };

    return (
      <Container>
        <FormControl sx={{ m: 1, width }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
          <Input
            disabled={disabled}
            value={defaultValue}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            placeholder={placeholder}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {isCopyBtn && (
          <Button onClick={onCopy} className={`${'copy-button'} ${copyButtonText === COPY_TEXT.ACTIVE && 'active'} `}>
            {copyButtonText}
          </Button>
        )}
      </Container>
    );
  }
);

export default CustomInput;
