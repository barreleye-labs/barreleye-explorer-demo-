import { useEffect } from 'react';

import { barreleyeConfig, nayoungConfig, youngminConfig } from '@config/nodeConfig';

import AccountService from '@services/account';

import AvatarCard from '@components/card/AvatarCard';

import { Stack } from './styles';

const Nodes = () => {
  const { data: barreleye, mutate: barreleyeMutate } = AccountService().GetOneByIdQuery(barreleyeConfig.ADDRESS, {
    refreshInterval: true
  });
  const { data: youngmin, mutate: youngminMutate } = AccountService().GetOneByIdQuery(youngminConfig.ADDRESS, {
    refreshInterval: true
  });
  const { data: nayoung, mutate: nayoungMutate } = AccountService().GetOneByIdQuery(nayoungConfig.ADDRESS, {
    refreshInterval: true
  });

  useEffect(() => {
    barreleyeMutate();
    youngminMutate();
    nayoungMutate();
  });

  return (
    <Stack>
      <AvatarCard
        config={barreleyeConfig}
        src="src/assets/barreleye.png"
        address={barreleye?.account.address ?? '-'}
        nonce={barreleye?.account.nonce ?? '0'}
        balance={barreleye?.account.balance ?? '0'}
        title="Barreleye"
      />

      <AvatarCard
        config={nayoungConfig}
        src="src/assets/nayoung.jpeg"
        address={nayoung?.account.address ?? '-'}
        nonce={nayoung?.account.nonce ?? '0'}
        balance={nayoung?.account.balance ?? '0'}
        title="Nayoung"
      />

      <AvatarCard
        config={youngminConfig}
        src="src/assets/youngmin.jpeg"
        address={youngmin?.account.address ?? '-'}
        nonce={youngmin?.account.nonce ?? '0'}
        balance={youngmin?.account.balance ?? '0'}
        title="Youngmin"
      />
    </Stack>
  );
};

export default Nodes;
