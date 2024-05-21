import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function PopoverComp({
  open,
  anchorEl,
  text,
  handlePopoverClose,
}) {
  return (
    <div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="body2" sx={{ p: 0.5 }}>
          {text}
        </Typography>
      </Popover>
    </div>
  );
}
