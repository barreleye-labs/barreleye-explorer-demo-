import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Crypto } from 'src/utils';

import Layout from '@src/layouts';

import './App.css';
import { Signature } from './utils/crypto';

// // Convert a hex string to a byte array
// function hexToBytes(hex: string): Uint8Array {
//   const bytes = [];
//   for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
//   return bytes;
// }

// // Convert a byte array to a hex string
// function bytesToHex(bytes: number[]) {
//   const hex = [];
//   for (let i = 0; i < bytes.length; i++) {
//     const current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
//     hex.push((current >>> 4).toString(16));
//     hex.push((current & 0xf).toString(16));
//   }
//   return hex.join('');
// }

function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(Math.ceil(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

function uint8ArrayToHex(bytes: Uint8Array): string {
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] < 16) hex += '0';
    hex += bytes[i].toString(16);
  }
  return hex;
}

export function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const tx = {
      nonce: '01',
      from: '54d1b47432f5d8bfe6f747611470476225b59703',
      to: '1e6be996ac95dc6ccbb9a119fbbc0f3eb2a449fc',
      value: '11',
      data: '01'
    };

    const privateKey: string = Crypto.generatePrivateKey();

    const nonce = hexToUint8Array(tx.nonce);
    const from = hexToUint8Array(tx.from);
    const to = hexToUint8Array(tx.to);
    const value = hexToUint8Array(tx.value);
    const data = hexToUint8Array(tx.data);
    const x = hexToUint8Array(Crypto.generatePublicKey(privateKey).x);
    const y = hexToUint8Array(Crypto.generatePublicKey(privateKey).y);

    console.log('signerX: ', Crypto.generatePublicKey(privateKey).x);
    console.log('signerY: ', Crypto.generatePublicKey(privateKey).y);

    const concatArray = new Uint8Array([...nonce, ...from, ...to, ...value, ...data, ...x, ...y]);
    const message = uint8ArrayToHex(concatArray);
    const signature: Signature = Crypto.signMessage(message, privateKey);
    console.log('signatureR: ', signature.r);
    console.log('signatureS: ', signature.s);
    console.log('result: ', Crypto.verifyMessage(message, Crypto.generatePublicKey(privateKey), signature));
    if (pathname === '/') navigate('/dashboard');
  }, [pathname]);

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
