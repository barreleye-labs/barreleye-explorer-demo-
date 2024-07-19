import { ReactNode } from 'react';

import type { ColorPaletteProp, VariantProp } from '@mui/joy';
import DefaultButton from '@mui/joy/Button';

interface Props {
  text: any;
  variant?: VariantProp;
  size?: 'sm' | 'md' | 'lg';
  color?: ColorPaletteProp;
  className?: string;
  children?: ReactNode;
  startDecorator?: ReactNode;
  onClick?: () => void;
}
const Button = ({ className, variant = 'outlined', color = 'neutral', size, text, startDecorator, onClick }: Props) => {
  return (
    <DefaultButton
      className={className}
      size={size}
      startDecorator={startDecorator}
      variant={variant}
      color={color}
      onClick={onClick}
    >
      {text}
    </DefaultButton>
  );
};

export default Button;
