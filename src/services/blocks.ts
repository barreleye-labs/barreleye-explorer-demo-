import { BlockResponse, BlocksResponse } from '@type/dto/block';

import { service } from '@src/utils/http';

const BlocksService = () => {
  async function GetAll({ page, size }: Record<string, number>) {
    const { data } = await service.get<BlocksResponse>(`/blocks?page=${page}&size=${size}`);
    return data;
  }

  async function GetOneById(id: string) {
    const { data } = await service.get<BlockResponse>(`/blocks/${id}`);
    return data;
  }

  async function GetLast() {
    const { data } = await service.get<BlockResponse>(`/last-block`);
    return data;
  }

  return {
    GetAll,
    GetOneById,
    GetLast
  };
};
export default BlocksService;
