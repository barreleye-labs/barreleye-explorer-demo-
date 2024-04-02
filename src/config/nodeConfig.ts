export interface NodeConfig {
  KEY: string;
  API: string;
  P2P_END_POINT: string;
  ADDRESS: string;
  email?: string;
  github?: string;
  linkedIn?: string;
}

export const barreleyeConfig: NodeConfig = {
  KEY: 'barreleye',
  ADDRESS: '9bb0225be9e3a5f0b57fbc2bf445b8e6ab6b3316',
  API: 'https://barreleyescan.com:9000',
  P2P_END_POINT: 'https://barreleyescan.com:4100',
  github: 'https://github.com/barreleye-labs'
};

export const youngminConfig: NodeConfig = {
  KEY: 'youngmin',
  API: 'https://barreleyescan.com:9002',
  ADDRESS: '3ea3aafbc1fe8d5918fd0fb9519c544b41ef69c5',
  P2P_END_POINT: 'https://barreleyescan.com:4102',
  email: 'k930503@gmail.com',
  github: 'https://github.com/k930503',
  linkedIn: 'https://www.linkedin.com/in/youngmin-kim-236574216/'
};

export const nayoungConfig: NodeConfig = {
  KEY: 'nayoung',
  API: 'https://barreleyescan.com:9001',
  ADDRESS: 'adcbfc06b6bd6295c1cf3574f9a58937feb11dde',
  P2P_END_POINT: 'https://barreleyescan.com:4101',
  email: 'usiyoung7@gmail.com',
  github: 'https://github.com/usiyoung'
};

export default { barreleyeConfig, youngminConfig, nayoungConfig };
