import { useMutation } from '@tanstack/react-query';

import FaucetService from '@services/faucet';

import { FaucetRequest } from '@type/dto/transaction';

const useFaucetQuery = () => {
  function Send() {
    return useMutation({
      mutationFn: (params: FaucetRequest) => FaucetService().Send(params)
    });
  }

  return {
    Send
  };
};

export default useFaucetQuery;
