import { useEffect } from 'react';

import AccountService from '@services/account.ts';

import AvatarCard from '@components/card/AvatarCard';

import { barreleyeConfig, nayoungConfig, youngminConfig } from './nodeConfig';
import { Stack } from './styles';

const Nodes = () => {
  const { data: barreleye, mutate: barreleyeMutate } = AccountService().GetOneByIdQuery(
    'f4bcd665c2595fb3253ade200bb80d7e5ddd9ca2',
    { refreshInterval: true }
  );
  const { data: youngmin, mutate: youngminMutate } = AccountService().GetOneByIdQuery(
    '16645fd53030389ea5252f7755b7fce54d0aa644',
    { refreshInterval: true }
  );
  const { data: nayoung, mutate: nayoungMutate } = AccountService().GetOneByIdQuery(
    '1e4f5ff2f09df766411402b52e146fb666abdc44',
    { refreshInterval: true }
  );

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
