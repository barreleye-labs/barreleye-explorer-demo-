import { useEffect, useState } from 'react';

import { Char, Crypto } from '@utils';

type UseSessionStorage<T> = [() => T | string | undefined, (value: T) => void, () => void, string | undefined];

function useSessionStorage<T>(key: string): UseSessionStorage<T> {
  const [address, setAddress] = useState<string | undefined>();

  const getSession = (): T | string | undefined => {
    try {
      const item = window.sessionStorage.getItem(key);

      if (item === null) return undefined;

      return item;
    } catch (error) {
      return undefined;
    }
  };

  const setSession = (value: T): void => {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  const removeSession = (): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  const sessionToAddress = async () => {
    const value = await Crypto.privateKeyToAddress(getSession() as string);

    setAddress(Char.ellipsis(value as string));
  };

  useEffect(() => {
    if (getSession()) {
      sessionToAddress().then(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return [getSession, setSession, removeSession, address];
}

export default useSessionStorage;
