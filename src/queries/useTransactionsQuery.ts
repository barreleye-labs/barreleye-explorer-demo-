import { useMutation, useQuery } from '@tanstack/react-query';

import TransactionsService from '@services/transactions';

import { TransactionRequest } from '@type/dto/transaction';

const useTransactionsQuery = () => {
  function GetAll({ page, size }: Record<string, number>) {
    return useQuery({
      queryKey: ['transactions', page + '-' + size],
      queryFn: () => TransactionsService().GetAll({ page, size }),
      refetchInterval: 1000
    });
  }

  function GetOneById(id: string) {
    return useQuery({
      queryKey: ['transaction', id],
      queryFn: () => TransactionsService().GetOneById(id)
    });
  }

  function Send() {
    return useMutation({
      mutationFn: (params: TransactionRequest) => TransactionsService().Send(params)
    });
  }

  return {
    GetAll,
    GetOneById,
    Send
  };
};

export default useTransactionsQuery;
