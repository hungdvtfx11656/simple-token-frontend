import { useEffect } from "react";
import { ethers } from "ethers";

import TokenArtifact from "../../contracts/Token.json";
import contractAddress from "../../contracts/contract-address.json";

import useNetwork from "../network/useNetwork";
import useToken from "./useToken";

// ----------------------------------------------------------------------

/**
 * Initialize token contract and set into app state
 */
const TokenInit = () => {
  const setToken = useToken((state) => state.setToken);
  const setName = useToken((state) => state.setName);
  const setSymbol = useToken((state) => state.setSymbol);

  const address = useNetwork((state) => state.address);
  const provider = useNetwork((state) => state.provider);

  useEffect(() => {
    const init = async (tokenInstance) => {
      setToken(tokenInstance);
      const name = await tokenInstance.name();
      setName(name);
      const symbol = await tokenInstance.symbol();
      setSymbol(symbol);
    };
    const tokenInstance = new ethers.Contract(contractAddress.Token, TokenArtifact.abi, provider.getSigner(0));
    init(tokenInstance);
  }, [address, provider, setName, setSymbol, setToken]);

  return null;
};

export default TokenInit;
