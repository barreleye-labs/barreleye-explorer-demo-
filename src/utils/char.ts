function hexToBalance(hex: string): string {
  return Number(hexToDecimal(hex)).toLocaleString('ko-KR');
}

function bytesToHex(bytes: number[]): string {
  return bytes.map((byte) => (byte < 0 ? byte + 256 : byte).toString(16).padStart(2, '0')).join('');
}

function hexToUint8Array(hex: string): Uint8Array {
  const length = Math.ceil(hex.length / 2);
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
function numberToHex(value: number): string {
  let hex: string = value.toString(16);
  if (hex.length % 2 == 1) {
    hex = '0'.concat(hex);
  }
  return hex;
}

function remove0x(hex: string): string {
  return hex.startsWith('0x') ? hex.slice(2) : hex;
}

function add0x(hex: string): string {
  return hex.startsWith('0x') ? hex : `0x${hex}`;
}

function hexToDecimal(hex: string): string {
  return parseInt(hex, 16).toString();
}

function isAddress(address: string): boolean {
  const cleanedAddress = remove0x(address);
  return /^[0-9a-fA-F]{40}$/.test(cleanedAddress);
}

function ellipsisMiddle(value: string): string {
  return `${value.substring(0, 6)}...${value.slice(-6)}`;
}

function ellipsisEnd(value: string): string {
  return `${value.substring(0, 8)}...`;
}

// 모든 유틸리티 함수들을 Char 객체로 내보내어 모듈화합니다.
export const Char = {
  bytesToHex,
  hexToBalance,
  hexToUint8Array,
  uint8ArrayToHex,
  numberToHex,
  isAddress,
  ellipsisMiddle,
  ellipsisEnd,
  add0x,
  remove0x,
  hexToDecimal
};
