import { TransactionRequest, TransactionResponse, TransactionsResponse } from '@type/dto/transaction';

import { service } from '@src/utils/http';

const TransactionsService = () => {
  async function GetAll({ page, size }: Record<string, number>) {
    const { data } = await service.get<TransactionsResponse>(`/txs?page=${page}&size=${size}`);
    return data;
  }

  async function GetOneById(id: string) {
    const { data } = await service.get<TransactionResponse>(`/txs/${id}`);
    return data;
  }

  async function Send(params: TransactionRequest) {
    return await service.post<TransactionRequest>(`/txs`, params);
  }

  return {
    GetAll,
    GetOneById,
    Send
  };
};
export default TransactionsService;
