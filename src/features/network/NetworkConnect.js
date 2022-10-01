import React, { useState } from "react";
import { ethers } from "ethers";

import { Alert, AlertTitle, Button, Stack } from "@mui/material";

import { NETWORK_ID } from "../../config";
import getNetWorkName from "../../utils/getNetWorkName";

import useNetwork from "./useNetwork";

// ----------------------------------------------------------------------

/**
 * Connect to ethereum wallet to start using dapp
 */
const NetworkConnect = () => {
  const error = useNetwork((state) => state.error);
  const setError = useNetwork((state) => state.setError);
  const setAddress = useNetwork((state) => state.setAddress);
  const setProvider = useNetwork((state) => state.setProvider);

  const [loading, setLoading] = useState(false);

  const handleConnectWallet = async () => {
    setLoading(true);
    // connect dapp to user's wallet
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // if current network is not match with deployed network
    if (window.ethereum.networkVersion !== NETWORK_ID) {
      // set network message
      setError({
        code: "Wrong Network",
        message: `Please connect Metamask to ${getNetWorkName(NETWORK_ID)}`,
      });
    } else {
      // initialize network connection
      setAddress(selectedAddress);
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
    setLoading(false);
  };

  return (
    <Stack direction="column" spacing={2} my={4}>
      {error && (
        <Alert severity="error">
          <AlertTitle>{error.code ?? "Unknown Error"}</AlertTitle>
          {error.message}
        </Alert>
      )}
      <Button variant="contained" disabled={loading} fullWidth onClick={handleConnectWallet}>
        Connect
      </Button>
    </Stack>
  );
};

export default NetworkConnect;
