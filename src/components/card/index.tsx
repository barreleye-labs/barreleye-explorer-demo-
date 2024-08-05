import { ReactNode } from 'react';

import { Container, CustomCard, DefaultCard } from './styles';

interface Props {
  children: ReactNode;
  background?: string;
  custom?: boolean;
  pointer?: boolean;
  onClick?: () => void;
}
const Card = ({ children, custom, background, onClick }: Props) => {
  return custom ? (
    <CustomCard background={background} onClick={onClick}>
      <Container>{children}</Container>
    </CustomCard>
  ) : (
    <DefaultCard>
      <Container>{children}</Container>
    </DefaultCard>
  );
};

export default Card;
