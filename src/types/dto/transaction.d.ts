import { Signature } from '@type/dto/signature';
import { Signer } from '@type/dto/signer';

export interface Transaction {
  hash: Hash;
  nonce: string;
  blockHeight: number;
  timestamp: number;
  from: string;
  to: string;
  value: string;
  data: string;
  signer: Signer;
  signature: Signature;
}

export interface TransactionResponse {
  transaction: Transaction;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  totalCount: number;
}

export interface TransactionRequest {
  nonce: string;
  from: string;
  to: string;
  value: number | string;
  data: string;
  signerX?: string;
  signerY?: string;
  signatureR?: string;
  signatureS?: string;
  [key: string]: any;
}

export interface FaucetRequest {
  accountAddress: string;
}
