import { useEffect } from 'react';

import { AccountService } from '@services';
import { AvatarCard } from 'barrel-ui-kit';

import { barreleyeConfig, nayoungConfig, youngminConfig } from '@config/nodeConfig';

import { Stack } from './styles';

const useNodeData = (address: string) => {
  const { data, mutate } = AccountService().GetOneByIdQuery(address, { refreshInterval: 60000 });
  useEffect(() => {
    mutate();
  }, [mutate]);
  return data;
};

const Nodes = () => {
  const barreleye = useNodeData(barreleyeConfig.ADDRESS);
  const nayoung = useNodeData(nayoungConfig.ADDRESS);
  const youngmin = useNodeData(youngminConfig.ADDRESS);

  const nodes = [
    { config: barreleyeConfig, data: barreleye, src: 'src/assets/barreleye.png', title: 'Barreleye' },
    { config: nayoungConfig, data: nayoung, src: 'src/assets/nayoung.jpeg', title: 'Nayoung' },
    { config: youngminConfig, data: youngmin, src: 'src/assets/youngmin.jpeg', title: 'Youngmin' }
  ];

  return (
    <Stack>
      {nodes.map(({ config, data, src, title }) => (
        <AvatarCard
          key={config.ADDRESS}
          config={config}
          src={src}
          address={data?.account.address ?? '-'}
          nonce={data?.account.nonce ?? '0'}
          balance={data?.account.balance ?? '0'}
          title={title}
        />
      ))}
    </Stack>
  );
};

export default Nodes;
