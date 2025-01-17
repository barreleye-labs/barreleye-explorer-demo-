import { useCallback } from 'react';

import { Signature } from '@type/dto/signature';
import { TransactionRequest } from '@type/dto/transaction';

import { Char, Crypto } from '@utils';

const createTransactionRequest = (
  nonce: string,
  from: string,
  to: string,
  value: string | number,
  data: string
): TransactionRequest => ({
  nonce,
  from: Char.remove0x(from),
  to: Char.remove0x(to),
  value: Char.numberToHex(Number(value)),
  data
});

const getTxUintArray = (sig: TransactionRequest): Uint8Array => {
  const sigEntries = Object.entries(sig) as [keyof TransactionRequest, string][];
  return new Uint8Array(
    sigEntries.reduce((acc: number[], [key, value]) => acc.concat(...Char.hexToUint8Array(value)), [])
  );
};

const getMessage = (txUintArray: Uint8Array): string => Char.uint8ArrayToHex(txUintArray);

const signMessage = (message: string, privateKey: string): Signature => Crypto.signMessage(message, privateKey);

const useSignature = (privateKey: string, tx: TransactionRequest) => {
  return useCallback((): Signature => {
    const { from, to, nonce, value, data } = tx;
    const sig = createTransactionRequest(nonce, from, to, value, data);
    const txUintArray = getTxUintArray(sig);
    const message = getMessage(txUintArray);

    return signMessage(message, privateKey);
  }, [privateKey, tx]);
};

export default useSignature;
