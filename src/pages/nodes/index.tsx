import { useEffect } from 'react';

import useAccountQuery from '@queries/useAccountQuery';

import AvatarCard from '@components/card/AvatarCard';

import { NodeConfig, barreleyeConfig, nayoungConfig, youngminConfig } from '@config/nodeConfig';

import { Stack } from './styles';

interface ConfigType {
  config: NodeConfig;
  src: string;
  title: string;
}

const Nodes = () => {
  const nodes: ConfigType[] = [
    { config: barreleyeConfig, src: 'src/assets/barreleye.png', title: 'Barreleye' },
    { config: nayoungConfig, src: 'src/assets/nayoung.jpeg', title: 'Nayoung' },
    { config: youngminConfig, src: 'src/assets/youngmin.jpeg', title: 'Youngmin' }
  ];

  return (
    <Stack>
      {nodes.map((data) => (
        <Node key={data.config.KEY} {...data} />
      ))}
    </Stack>
  );
};

const Node = ({ config, src, title }: ConfigType) => {
  const { data, refetch } = useAccountQuery(config.ADDRESS);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <AvatarCard
      key={config.ADDRESS}
      config={config}
      src={src}
      address={data?.account.address ?? '-'}
      nonce={data?.account.nonce ?? '0'}
      balance={data?.account.balance ?? '0'}
      title={title}
    />
  );
};
export default Nodes;
