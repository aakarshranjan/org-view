import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

export default function CustAccordion({ label, children }) {
  const [expanded, setExpanded] = React.useState("panel");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      style={{
        // marginTop: "1vh",
        paddingTop: "1.5vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Accordion
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
        sx={{
          borderRadius: "1rem !important",
          boxShadow: "none",
          width: "98%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            minHeight: "5vh !important",
            height: "5vh !important",
          }}
        >
          {label}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
      <Divider />
    </div>
  );
}
