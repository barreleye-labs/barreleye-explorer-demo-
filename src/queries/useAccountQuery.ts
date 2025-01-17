import { useQuery } from '@tanstack/react-query';

import AccountService from '@services/account';

import { Char } from '@utils';

const useAccountQuery = (id?: string, { enabled = false }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ['account', id],
    queryFn: () => AccountService().GetOneById(Char.remove0x(id as string)),
    enabled: !!id && enabled
  });
};

export default useAccountQuery;
