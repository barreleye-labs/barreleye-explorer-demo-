import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from '@hooks';
import { FilterNone as FilterNoneIcon } from '@mui/icons-material';
import { AccountService } from '@services';
import { Card, Detail, Row, SearchInput } from 'barrel-ui-kit';
import { debounce } from 'lodash-es';

import { Char } from '@utils';

const defaultAccount = () => {
  return { nonce: '0', balance: '0' };
};

const Account = () => {
  const navigate = useNavigate();
  const { address } = useParams();
  const showToast = useToast();
  const [account, setAccount] = useState<{ nonce: string; balance: string }>(defaultAccount());

  useEffect(() => {
    if (address) {
      fetchAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  async function fetchAccount() {
    const { data, error } = await AccountService().GetOneById(Char.remove0x(address as string));

    if (error) {
      return setAccount(defaultAccount());
    }

    setAccount(data.account);
  }

  const onValidCheck = debounce(async (address: string) => {
    Char.isAddress(address)
      ? navigate(`/account/${Char.add0x(address)}`)
      : showToast({ variant: 'error', message: 'Check your address format' });
  }, 500);

  const onChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    onValidCheck(Char.remove0x(e.target.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <Row label="Balance" content={`${Char.hexToBalance(account.balance)} Barrel `}></Row>
            <Row label="Nonce" content={Char.hexToDecimal(account.nonce)}></Row>
          </>
        )}
      </Detail>
    </Card>
  );
};

export default Account;
