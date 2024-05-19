import * as React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "../generic/Accordion";
import ToolTip from "../generic/Tooltip";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import "./OrgChartStyles.css";

export default function OrgChart({ orgData }) {
  function order(index) {
    return index == 0
      ? getOtherLevel(orgData.data.manager, 1)
      : index == 1
      ? getOtherLevel(orgData.data.employee, 2, "currentUser")
      : index == 2
      ? reporteesBlock(orgData.data.reportees)
      : null;
  }

  function getOtherLevel(emp, index, empType) {
    if (!emp) return order(index);

    return (
      <ul>
        <li>
          <ToolTip title={emp.name + " - " + emp.designation}>
            <Link to={`/employee/${emp.id}`} className={`leafLink ${empType}`}>
              <img
                loading="lazy"
                src={`/portraits/${emp.picUrl}`}
                className="profilePic"
              />
              <br />
              {emp.name}
              <br />
              {emp.designation}
            </Link>
          </ToolTip>
          {order(index)}
        </li>
      </ul>
    );
  }

  function reporteesBlock(reportees) {
    if (!reportees?.length) return null;
    return (
      <ul>
        <li>
          <div className="leafBlock">
            {reportees.map((r, i) => (
              <div className="node" key={i}>
                <ToolTip title={r.name + " - " + r.designation}>
                  <Link to={`/employee/${r.id}`} className="leafLink">
                    <img
                      src={`/portraits/${r.picUrl}`}
                      className="profilePic"
                    />
                    {/* src={r.picUrl} */}
                    <br />
                    {r.name}
                    <br />
                    {r.designation}
                  </Link>
                </ToolTip>
              </div>
            ))}
          </div>
        </li>
      </ul>
    );
  }

  const renderOrgComp = () => {
    return orgData?.data ? (
      <>
        {orgData.data.employee.directReporteesSize &&
        orgData.data.employee.directReporteesSize != 0 ? (
          <Box sx={{ display: "flex", justifyContent: "end", mr: 1 }}>
            <WorkspacesIcon fontSize="small" sx={{ mr: 0.5, color: "grey" }} />
            <Typography
              sx={{
                color: "grey",
                fontWeight: "bold",
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif !important",
                fontSize: "14px",
              }}
            >
              Direct Reportees : {orgData.data.employee.directReporteesSize}
            </Typography>
            <Box flex={0.025} />
            <Diversity3Icon fontSize="small" sx={{ mr: 0.5, color: "grey" }} />
            <Typography
              sx={{
                color: "grey",
                fontWeight: "bold",
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif !important",
                fontSize: "14px",
              }}
            >
              Team Size : {orgData.data.employee.totalTeamSize}
            </Typography>
          </Box>
        ) : null}

        <div className="tree">
          {getOtherLevel(orgData.data.superManager, 0)}
        </div>
      </>
    ) : (
      <div>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#666666" }}
          >
            {orgData?.message}
          </Typography>
        </Box>
      </div>
    );
  };

  // console.log("org", orgData.message);

  return (
    <>
      <Accordion
        // isExpanded={!orgData.message != "Success" ? true : false}
        label={
          <Typography
            sx={{ color: "#FC7500", fontWeight: "bold", fontSize: "16px" }}
          >
            Organization Chart
          </Typography>
        }
      >
        {renderOrgComp()}
      </Accordion>
    </>
  );
}
