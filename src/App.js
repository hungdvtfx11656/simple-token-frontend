import React from "react";

import { Container } from "@mui/material";

import WalletGuard from "./guards/WalletGuard";
import ConnectGuard from "./guards/ConnectGuard";

import NetworkUpdater from "./features/network/NetworkUpdater";
import TokenUpdater from "./features/token/TokenUpdater";

import TokenInit from "./features/token/TokenInit";
import Dashboard from "./features/token/Dashboard";
import Transfer from "./features/token/Transfer";

const App = () => (
  <Container fixed maxWidth="sm" sx={{ marginY: 4 }}>
    <WalletGuard>
      <ConnectGuard>
        <NetworkUpdater />
        <>
          <TokenInit />
          <TokenUpdater />
          <Dashboard />
          <Transfer />
        </>
      </ConnectGuard>
    </WalletGuard>
  </Container>
);

export default App;
