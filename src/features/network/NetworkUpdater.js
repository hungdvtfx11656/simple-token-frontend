import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { Alert, AlertTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import useNetwork from "./useNetwork";

// ----------------------------------------------------------------------

/**
 * Listen to network changes and update app state
 */
const NetworkUpdater = () => {
  const setAddress = useNetwork((state) => state.setAddress);
  const setProvider = useNetwork((state) => state.setProvider);

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // On account changed
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      if (newAddress === undefined) {
        setAddress(null);
        setProvider(null);
      } else {
        setAddress(newAddress);
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
        setAlert({
          severity: "info",
          title: "Address updated",
          body: newAddress,
        });
      }
    });

    // On network changed
    window.ethereum.on("chainChanged", ([networkId]) => {
      setAddress(null);
      setProvider(null);
    });
  }, [setAddress, setProvider]);

  if (!alert) return null;

  return (
    <Alert
      severity={alert.severity}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setAlert(null);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>{alert.title}</AlertTitle>
      {alert.body}
    </Alert>
  );
};

export default NetworkUpdater;
