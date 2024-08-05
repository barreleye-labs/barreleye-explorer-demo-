import useSWR, { type SWRConfiguration, type SWRResponse } from 'swr';

import { fetcher } from '@utils';

const useApi = <T>(path: string, config?: SWRConfiguration): SWRResponse<T> => {
  return useSWR<T>(path, fetcher, config);
};

export default useApi;
