import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [values, setValues] = useState(initialData);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;

      typeof values === 'object' ? setValues({ ...values, [name]: value }) : setValues(value as T);
    },
    [values]
  );

  return [values, handler, setValues];
};

export default useInput;
