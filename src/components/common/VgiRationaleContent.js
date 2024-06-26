import React from "react";
import { Box, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";

const renderContent = (text) => (
  <Box sx={{ marginY: 0, paddingY: 0 }}>
    {!text.trim().length ? (
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        No Data
      </Typography>
    ) : (
      text.split("<br />").map((t, i) => <Box key={i}>{t}</Box>)
    )}
  </Box>
);

const VgiRationaleContent = ({ text }) => (
  <React.Fragment>
    <DialogContent sx={{ fontSize: "13px", margin: 0.5 }}>
      {renderContent(text)}
    </DialogContent>
  </React.Fragment>
);

export default VgiRationaleContent;
