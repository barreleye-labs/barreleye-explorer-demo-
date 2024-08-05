import { BlockResponse, BlocksResponse } from '@type/dto/block';

import useApi from '@hooks/useApi';

const BlocksService = () => {
  const PATH: string = '/api/blocks';

  function GetAll({ page, size }: Record<string, number>) {
    return useApi<BlocksResponse>(`${PATH}?page=${page}&size=${size}`, {
      refreshInterval: 1000
    });
  }

  function GetOneById(id: string) {
    return useApi<BlockResponse>(`${PATH}/${id}`, {});
  }

  function GetLast() {
    return useApi<BlockResponse>(`/api/last-block`, { refreshInterval: 1000 });
  }

  return {
    GetAll,
    GetOneById,
    GetLast
  };
};
export default BlocksService;
