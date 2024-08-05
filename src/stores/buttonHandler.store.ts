import { create } from 'zustand';

export const BTN_TYPE = {
  FAUCET: 'loadingFaucet',
  TRANSFER: 'loadingTransfer'
} as const;

type BtnTypeKeys = keyof typeof BTN_TYPE;
type BtnTypeValues = (typeof BTN_TYPE)[BtnTypeKeys];

interface State {
  loadingFaucet: boolean;
  loadingTransfer: boolean;
  setLoading: (type: BtnTypeValues) => void;
}

export const buttonHandlerStore = create<State>((set) => ({
  loadingFaucet: false,
  loadingTransfer: false,

  setLoading: (type: BtnTypeValues) => set((state) => ({ ...state, [type]: !state[type] }))
}));
