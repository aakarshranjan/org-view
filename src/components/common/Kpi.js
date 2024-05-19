import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InfoIcon from "@mui/icons-material/Info";
import { grey } from "@mui/material/colors";
import TocIcon from "@mui/icons-material/Toc";
import BarChartIcon from "@mui/icons-material/BarChart";
import Accordion from "../../generic/Accordion";
import Modal from "../../generic/Modal";
import Popover from "../../generic/Popover";
import ToggleButton from "../../generic/ToggleButton";
import CircularLoader from "../../generic/CircularLoader";
import KpiDefContent from "./KpiDefContent";
import { getData } from "../../../utils/service";
const BarChart = React.lazy(() =>
  import(
    /* webpackChunkName: "kpiChart" */
    /* webpackPrefetch: true */
    "../BarChart"
  )
);
const DataGrid = React.lazy(() =>
  import(
    /* webpackChunkName: "kpiGrid" */
    /* webpackPrefetch: true */
    "../Grid"
  )
);

const dataGridCols = [
  { field: "id", headerName: "Id", width: 110, hide: true },
  { field: "empId", headerName: "Emp Id", width: 110, hide: true },
  { field: "quarter", headerName: "Quarter", maxWidth: 110 },
  {
    field: "kpiDefName",
    headerName: "KPI",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <Box>
        {params.value?.split("<br />").map((t, i) => (
          <Box key={i}>{t}</Box>
        ))}
      </Box>
    ),
  },
  {
    field: "kpiDefVal",
    headerName: "KPI Definition",
    width: 200,
    flex: 1,
    renderCell: (params) => (
      <Box>
        {params.value?.split("<br />").map((t, i) => (
          <Box key={i}>{t}</Box>
        ))}
      </Box>
    ),
  },
  { field: "year", headerName: "Year", width: 110, hide: true },
  {
    field: "weightage",
    headerName: "Weightage",
    maxWidth: 110,
    renderCell: (params) => <>{params.value ? `${params.value}% ` : null}</>,
  },
  {
    field: "plannedValue",
    headerName: "Planned Value",
    maxWidth: 110,
    renderCell: (params) => (
      <>
        {params.value
          ? `${params.value}${params.row.isKpiPercent != "No" ? "%" : ""}`
          : null}
      </>
    ),
  },
  {
    field: "actualValue",
    headerName: "Actual Value",
    maxWidth: 110,
    renderCell: (params) => (
      <>
        {params.value
          ? `${params.value}${params.row.isKpiPercent != "No" ? "%" : ""}`
          : null}
      </>
    ),
  },
];

const Kpi = ({
  kpiData,
  dispatch,
  paramId,
  actionType,
  URL,
  accordionText,
}) => {
  let curYear = new Date().getFullYear();
  let viewOptions = [
    {
      value: "chart",
      displayName: "Chart",
      icon: <BarChartIcon />,
    },
    { value: "grid", displayName: "Grid", icon: <TocIcon /> },
  ];

  const [kpiConfig, setKpiConfig] = React.useState({
    kpiYear: curYear,
    kpiView: viewOptions[0]?.value,
  });

  const [showKpiDef, setShowKpiDef] = React.useState(null);

  const [popoverOptions, setPopoverOption] = React.useState({
    anchorEl: null,
    text: null,
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggleYear = (e, val) => {
    if (!val) return;
    setKpiConfig({
      ...kpiConfig,
      kpiYear: val,
      kpiView: viewOptions[0]?.value,
    });
    flushKpiData();
  };

  const handleToggleView = (e, val) => {
    if (!val) return;
    setKpiConfig({
      ...kpiConfig,
      kpiView: val,
    });
    flushKpiData();
  };

  const handlePopoverOpen = (event, text) => {
    setPopoverOption({ anchorEl: event.currentTarget, text });
  };

  const handlePopoverClose = () => {
    setPopoverOption({ anchorEl: null, text: null });
  };

  const popoverOpen = Boolean(popoverOptions.anchorEl);

  const flushKpiData = () => {
    dispatch({
      type: actionType,
      payload: { data: [], message: <CircularLoader /> },
    });
  };

  React.useEffect(() => {
    // if (kpiData.data?.length) {
    //   flushKpiData();
    // }
    flushKpiData();
    const getKpiData = async () => {
      try {
        const res = await getData(
          `${URL}${kpiConfig.kpiView}/${paramId}/${kpiConfig.kpiYear}`
        );
        if (res.status == 200 && res.data.status == "SUCCESS") {
          if (!res.data.data.length) {
            dispatch({
              type: actionType,
              payload: { data: [], message: "No Data" },
            });
          } else {
            dispatch({
              type: actionType,
              payload: { data: res.data.data, message: "Success" },
            });
          }
        } else {
          dispatch({
            type: actionType,
            payload: { data: [], message: "No Data" },
          });
        }
      } catch (e) {
        dispatch({
          type: actionType,
          payload: { data: [], message: "Some error occured" },
        });
      }
    };
    paramId ? getKpiData() : null;
  }, [kpiConfig, paramId]);

  const generateKpiView = () => {
    switch (kpiConfig.kpiView) {
      case "chart":
        return yearlyGroupedCharts();
      case "grid":
        return (
          <React.Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularLoader />
              </Box>
            }
          >
            <DataGrid
              rows={kpiData.data}
              cols={dataGridCols}
              gridType="small"
            />
          </React.Suspense>
        );
      default:
        return messageContainer(
          "Something went wrong! Please contact the administrator"
        );
    }
  };

  const chartContainerContent = (kpi, isSingleElement) => (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
          align="center"
        >
          {kpi.kpiName}
        </Typography>
        <IconButton
          color="orange"
          onClick={() =>
            setShowKpiDef({
              header: kpi.kpiName,
              component: <KpiDefContent text={kpi.kpiDefinition} />,
            })
          }
          onMouseEnter={(e) => handlePopoverOpen(e, "KPI Definition")}
          onMouseLeave={handlePopoverClose}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        width={
          isSingleElement && isSmallScreen
            ? "90%"
            : isSingleElement && !isSmallScreen
            ? "45%"
            : "90%"
        }
        sx={{ margin: "0 auto" }}
      >
        <React.Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularLoader />
            </Box>
          }
        >
          <BarChart kpiData={kpi.kpis} isPercent={kpi.isKpiPercent} />
        </React.Suspense>
      </Box>
    </Box>
  );

  const yearlyGroupedCharts = () => (
    <>
      <Grid container spacing={4}>
        {kpiData.data?.map((kpi, i) => {
          return kpiData.data.length % 2 == 1 &&
            kpiData.data.length - 1 == i ? (
            <Grid item xs={12} md={12} lg={12} key={i}>
              {chartContainerContent(kpi, true)}
            </Grid>
          ) : (
            <Grid item xs={12} md={6} lg={6} key={i}>
              {chartContainerContent(kpi, false)}
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  const messageContainer = (children) => (
    <Grid container>
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={12}
        lg={12}
        md={12}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#666666" }}
        >
          {children}
        </Typography>
      </Grid>
    </Grid>
  );

  // console.log("KPI", kpiData.message, kpiData.message != "No Data");

  return (
    <Box>
      <Accordion
        // isExpanded={kpiData.message != "No Data" ? "panel" : false}
        label={
          <Typography
            sx={{ color: "#FC7500", fontWeight: "bold", fontSize: "16px" }}
          >
            {accordionText
              ? accordionText
              : "Key Performance Indicators (KPIs)"}
          </Typography>
        }
      >
        {showKpiDef ? (
          <Modal
            title={showKpiDef.header}
            closeCallback={() => setShowKpiDef(null)}
          >
            {showKpiDef.component}
          </Modal>
        ) : null}

        {popoverOpen ? (
          <Popover
            open={popoverOpen}
            anchorEl={popoverOptions.anchorEl}
            text={popoverOptions.text}
            handlePopoverClose={handlePopoverClose}
          />
        ) : null}

        <Grid container>
          <Grid item xs={4} lg={4} md={4} display="flex" alignItems="center">
            <ToggleButton
              options={[
                { value: curYear, displayName: curYear.toString() },
                { value: curYear - 1, displayName: (curYear - 1).toString() },
              ]}
              value={kpiConfig.kpiYear}
              handleToggleButtonChange={handleToggleYear}
            />
          </Grid>
          <Grid item xs={4} lg={4} md={4}>
            {kpiConfig.kpiView == "chart" && (
              <Box
                sx={{
                  width: "21vw",
                  background: grey[300],
                  display: "flex",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      ml: "1vw",
                      width: "1vw",
                      height: "1vw",
                      borderRadius: "50%",
                      backgroundColor: "#4FC4F7",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ marginLeft: "0.2vw", fontSize: "14px" }}
                  >
                    Planned Target
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      ml: "1vw",
                      width: "1vw",
                      height: "1vw",
                      borderRadius: "50%",
                      backgroundColor: "#FC7500",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ marginLeft: "0.2vw", fontSize: "14px" }}
                  >
                    Actual Achieved
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={4} lg={4} md={4} display="flex" justifyContent="end">
            <ToggleButton
              options={viewOptions}
              value={kpiConfig.kpiView}
              handleToggleButtonChange={handleToggleView}
            />
            {/* <Button
                sx={{ borderRadius: 4 }}
                onClick={() =>
                    setShowKpiDef({
                    header: `KPI Weightages, Year - ${kpiYear}`,
                    component: (
                        <KpiWeightage data={kpiData.data} />
                    ),
                    })
                }
                >
                Show Weightages
                </Button> */}
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "5vh" }}>
          {kpiData.data?.length
            ? generateKpiView()
            : messageContainer(kpiData.message)}
        </Box>
      </Accordion>
    </Box>
  );
};

export default Kpi;
