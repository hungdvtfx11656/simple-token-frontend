import create from "zustand";

const useNetwork = create((set) => ({
  // user-selected address
  address: null,
  setAddress: (address) => set({ address: address }),

  // app provider
  provider: null,
  setProvider: (provider) => set({ provider: provider }),

  // network error
  error: null,
  setError: (error) => set({ error: error }),
}));

export default useNetwork;
