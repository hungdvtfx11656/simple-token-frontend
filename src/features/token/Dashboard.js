import React from "react";
import { Stack, Typography } from "@mui/material";
import KeyValuePair from "../../components/KeyValuePair";
import useToken from "./useToken";

// ----------------------------------------------------------------------

/**
 * Display token-contract information
 */
const Dashboard = () => {
  const name = useToken((state) => state.name);
  const symbol = useToken((state) => state.symbol);
  const _balance = useToken((state) => state.balance);

  const balance = _balance ? _balance.toString() : "";

  return (
    <Stack direction="column" spacing={1} my={4}>
      <Typography variant="h6" textTransform="uppercase">
        Contract info:
      </Typography>

      <KeyValuePair title="Token name" body={name} />
      <KeyValuePair title="Token symbol" body={symbol} />
      <KeyValuePair title="Your Balance" body={balance} />
    </Stack>
  );
};

export default Dashboard;
