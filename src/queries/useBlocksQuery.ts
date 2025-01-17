import { useQuery } from '@tanstack/react-query';

import BlocksService from '@services/blocks';

const useBlocksQuery = () => {
  function GetAll({ page, size }: Record<string, number>) {
    return useQuery({
      queryKey: ['blocks', page + '-' + size],
      queryFn: () => BlocksService().GetAll({ page, size }),
      refetchInterval: 5000
    });
  }

  function GetOneById(id: string) {
    return useQuery({
      queryKey: ['block', id],
      queryFn: () => BlocksService().GetOneById(id)
    });
  }

  function GetLast() {
    return useQuery({
      queryKey: ['last-block'],
      queryFn: () => BlocksService().GetLast(),
      refetchInterval: 3000
    });
  }

  return {
    GetAll,
    GetOneById,
    GetLast
  };
};

export default useBlocksQuery;
