import React from "react";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const KpiDefContent = ({ text }) => (
  <React.Fragment>
    <DialogContent sx={{ fontSize: "13px", margin: 0.5 }}>
      <Box sx={{ marginY: 0, paddingX: 0.5 }}>
        {text ? (
          text.split("<br />").map((t, i) => <Box key={i}>{t}</Box>)
        ) : (
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: "bold", color: "#666666" }}
          >
            No Data
          </Typography>
        )}
      </Box>
    </DialogContent>
  </React.Fragment>
);

export default KpiDefContent;
