import create from "zustand";

const useToken = create((set) => ({
  // contract instance
  token: null,
  setToken: (token) => set({ token: token }),

  // contract data
  name: null,
  setName: (name) => set({ name: name }),
  symbol: null,
  setSymbol: (symbol) => set({ symbol: symbol }),

  // address data
  balance: null,
  setBalance: (balance) => set({ balance: balance }),
}));

export default useToken;
