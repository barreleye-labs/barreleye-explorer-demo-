import { AccountResponse } from '@type/dto/account';

import { service } from '../utils/http';

const AccountService = () => {
  async function GetOneById(id: string) {
    const { data } = await service.get<AccountResponse>(`/accounts/${id}`);
    return data;
  }

  return {
    GetOneById
  };
};
export default AccountService;
