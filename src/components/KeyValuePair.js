import { Stack, Typography } from "@mui/material";
import React from "react";

const KeyValuePair = ({ title, body }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="subtitle1" color="GrayText">
        {title}:
      </Typography>
      <Typography variant="body1">{body}</Typography>
    </Stack>
  );
};

export default KeyValuePair;
