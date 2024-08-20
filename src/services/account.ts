import { useApi } from '@hooks';

import { AccountResponse } from '@type/dto/account';

import { service } from '@src/utils/http';

export const AccountService = () => {
  const PATH: string = '/api';

  function GetOneByIdQuery(id: string, option?: Record<string, boolean>) {
    return useApi<AccountResponse>(id && `${PATH}/accounts/${id}`, {
      ...option
    });
  }

  async function GetOneById(id: string) {
    return await service.get<AccountResponse>(`/accounts/${id}`);
  }

  return {
    GetOneByIdQuery,
    GetOneById
  };
};
