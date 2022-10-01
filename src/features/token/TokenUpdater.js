import { useEffect } from "react";
import useNetwork from "../network/useNetwork";
import useToken from "./useToken";

// ----------------------------------------------------------------------

/**
 * Subscribe to network, update contract data from network into app state
 */
const TokenUpdater = () => {
  const address = useNetwork((state) => state.address);
  const token = useToken((state) => state.token);
  const setBalance = useToken((state) => state.setBalance);

  useEffect(() => {
    const interval = setInterval(async () => {
      const balance = await token.balanceOf(address);
      setBalance(balance);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [address, token, setBalance]);

  return null;
};

export default TokenUpdater;
