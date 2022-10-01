import React from "react";
import useNetwork from "../features/network/useNetwork";
import NetworkConnect from "../features/network/NetworkConnect";

// ----------------------------------------------------------------------

/**
 * Require for network connection
 */
const ConnectGuard = ({ children }) => {
  const address = useNetwork((state) => state.address);

  if (!address) return <NetworkConnect />;

  return <>{children}</>;
};

export default ConnectGuard;
