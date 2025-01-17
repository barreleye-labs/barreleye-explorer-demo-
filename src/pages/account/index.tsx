import { ChangeEvent, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FilterNoneIcon from '@mui/icons-material/FilterNone';
import useAccountQuery from '@queries/useAccountQuery';
import { debounce } from 'lodash-es';

import useToast from '@hooks/useToast';

import Card from '@components/card';
import Detail from '@components/detail';
import Row from '@components/row';
import SearchInput from '@components/searchInput';

import { Char } from '@utils';

const Account = () => {
  const navigate = useNavigate();
  const showToast = useToast();

  const { address } = useParams();
  const { data } = useAccountQuery(address);

  const onValidCheck = debounce(async (address: string) => {
    Char.isAddress(address)
      ? navigate(`/account/${Char.add0x(address)}`)
      : showToast({ variant: 'error', message: 'Check your address format' });
  }, 500);

  const onChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    onValidCheck(Char.remove0x(e.target.value));
  }, []);

  return (
    <Card>
      <SearchInput onChange={onChange} />

      <Detail icon={<FilterNoneIcon />} title={address ? Char.ellipsisMiddle(address) : 'No Account Info'}>
        {!address ? (
          'Search Account!'
        ) : (
          <>
            <Row label="Address" content={address}></Row>

            <Row label="Balance" content={`${data ? Char.hexToBalance(data.account.balance) : '0'} Barrel `}></Row>
            <Row label="Nonce" content={data ? Char.hexToDecimal(data.account.nonce) : '0'}></Row>
          </>
        )}
      </Detail>
    </Card>
  );
};

export default Account;
