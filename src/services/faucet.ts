import { FaucetRequest, TransactionResponse } from '@type/dto/transaction';

import { service } from '@src/utils/http';

const FaucetService = () => {
  async function Send(params: FaucetRequest) {
    return await service.post<TransactionResponse>('/faucet', params);
  }

  return {
    Send
  };
};
export default FaucetService;
