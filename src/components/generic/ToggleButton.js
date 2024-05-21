import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtonComp({
  options,
  value,
  handleToggleButtonChange,
}) {
  return (
    <ToggleButtonGroup
      sx={{
        height: "4vh",
      }}
      color="primary"
      value={value}
      exclusive
      onChange={handleToggleButtonChange}
    >
      {options.map((o, i) => (
        <ToggleButton
          key={i}
          value={o.value}
          sx={{ padding: 0.5, textTransform: "none", fontWeight: 520 }}
        >
          {o.icon ? o.icon : o.displayName}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
