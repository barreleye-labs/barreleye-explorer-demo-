import { useNavigate } from 'react-router-dom';

import useSessionStorage from '@hooks/useSessionStorage';

import { PrivateForm } from '@components/form';

import { commonPrivateKeyStore } from '@src/stores';

const SignIn = () => {
  const navigate = useNavigate();
  const { set: setCommonPrivateKey } = commonPrivateKeyStore();
  const [_, setSession] = useSessionStorage<string>('key');

  const onSubmit = (privateKeyStore: { privateKey: string }) => {
    const { privateKey } = privateKeyStore;
    setSession(privateKey as string);
    setCommonPrivateKey(privateKey);
    navigate('/');
  };

  return (
    <PrivateForm title="Enter an acceptable private key." sub=" Please enter your private key." onNext={onSubmit} />
  );
};

export default SignIn;
