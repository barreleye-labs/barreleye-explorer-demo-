import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useSessionStorage from '@hooks/useSessionStorage';

import { PrivateForm } from '@components/form';

import { commonPrivateKeyStore } from '@src/stores';

const SignIn = () => {
  const navigate = useNavigate();
  const [privateKey, setPrivateKey] = useState('');
  const { set: setCommonPrivateKey } = commonPrivateKeyStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSession] = useSessionStorage<string>('key');

  const onSubmit = useCallback(() => {
    setSession(privateKey as string);
    setCommonPrivateKey(privateKey);
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateKey]);

  return (
    <PrivateForm
      title="Enter an acceptable private key."
      sub=" Please enter your private key."
      defaultValue={privateKey}
      onChange={(e) => setPrivateKey(e.target.value)}
      onClick={onSubmit}
    />
  );
};

export default SignIn;
