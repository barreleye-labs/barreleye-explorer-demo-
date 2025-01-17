import { ChangeEvent, memo } from 'react';
import { useParams } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

import { Container } from './styles';

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput = memo(({ onChange }: Props) => {
  const { address } = useParams();
  return (
    <Container>
      <Button variant="soft" size="sm">
        <SearchIcon fontSize="large" />
      </Button>
      <Input
        defaultValue={address}
        size="md"
        placeholder="Search by account address."
        sx={{
          fontSize: '16px',
          '--Input-radius': `${16}px`,
          '--Input-decoratorChildHeight': `${29}px`
        }}
        onChange={(e) => onChange && onChange(e)}
      />
    </Container>
  );
});

export default SearchInput;
