import React, { useEffect, useState } from "react";

import { Alert, AlertTitle, Button, Stack, TextField, Typography } from "@mui/material";

import getRpcErrorMessage from "../../utils/getRpcErrorMessage";

import useNetwork from "../network/useNetwork";
import useToken from "./useToken";

// ----------------------------------------------------------------------

/**
 * Transfer token of contract between addresses
 */
const Transfer = () => {
  const address = useNetwork((state) => state.address);
  const token = useToken((state) => state.token);

  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [mining, setMining] = useState(null);

  // reset component state when user change address
  useEffect(() => {
    setAmount("");
    setRecipient("");
    setError(null);
    setDisabled(false);
    setMining(null);
  }, [address]);

  const handleTransfer = async () => {
    setError(null);
    try {
      // disable field on sending transaction
      // and on mining transaction
      setDisabled(true);

      const tx = await token.transfer(recipient, amount);
      setMining(tx.hash);

      const receipt = await tx.wait();

      // token sent unsuccessfully
      if (receipt.status === 0)
        throw new Error({
          message: "Transaction failed",
        });

      // clear input on token sent successfully
      setAmount("");
      setRecipient("");
    } catch (error) {
      if (error.code === "ACTION_REJECTED") {
        // do nothing if user reject sending
        return;
      } else {
        setError(error);
      }
    } finally {
      setDisabled(false);
      setMining(null);
    }
  };

  return (
    <Stack direction="column" spacing={2} my={4}>
      <Typography variant="h6" textTransform="uppercase">
        Transfer tokens:
      </Typography>
      {error && (
        <Alert severity="error" sx={{ overflow: "hidden", maxHeight: "6rem" }}>
          {getRpcErrorMessage(error)}
        </Alert>
      )}
      {mining && (
        <Alert severity="info">
          <AlertTitle>Mining...</AlertTitle>
          {mining}
        </Alert>
      )}
      <TextField disabled label="From address" value={address} fullWidth />
      <TextField
        disabled={disabled}
        label="To address"
        value={recipient}
        fullWidth
        onChange={(e) => setRecipient(e.target.value)}
      />
      <TextField
        disabled={disabled}
        label="Amount"
        value={amount}
        fullWidth
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button disabled={disabled} variant="contained" onClick={handleTransfer}>
        Transfer
      </Button>
    </Stack>
  );
};

export default Transfer;
