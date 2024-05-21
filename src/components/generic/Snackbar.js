import React from "react";
import { Snackbar, MuiAlert } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PositionedSnackbar({ snackbarDetails, onSnackbarClose }) {
  const { open, severity, message, duration } = snackbarDetails;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={duration}
        onClose={onSnackbarClose}
      >
        <Alert
          onClose={onSnackbarClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PositionedSnackbar;
