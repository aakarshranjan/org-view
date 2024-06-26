import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import InfoIcon from "@mui/icons-material/Info";
import Accordion from "../../generic/Accordion";
import Modal from "../../generic/Modal";
import VgiRationaleContent from "./VgiRationaleContent";
import CustomizedMenus from "../../generic/IconMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Popover from "../../generic/Popover";
import { theme } from "../../../utils/theme";
import VgiDialog from "./VgiModalContent";
import { SnackbarUpdateContext } from "../../../utils/empState";

export default function Vgi({
  vgiData,
  empDataDispatch,
  curUserState,
  employeeId,
}) {
  const [showModal, setShowModal] = React.useState({
    title: null,
    type: null,
    val: null,
  });

  const [popoverOptions, setPopoverOption] = React.useState({
    anchorEl: null,
    text: null,
  });

  const snackbarStateUpdate = React.useContext(SnackbarUpdateContext);

  const handlePopoverOpen = (event, text) => {
    setPopoverOption({ anchorEl: event.currentTarget, text });
  };

  const handlePopoverClose = () => {
    setPopoverOption({ anchorEl: null, text: null });
  };
  const popoverOpen = Boolean(popoverOptions.anchorEl);

  return (
    <>
      <Accordion
        // isExpanded={vgiData.message != "No Data" ? "panel" : false}
        label={
          <Typography
            sx={{ color: "#FC7500", fontWeight: "bold", fontSize: "16px" }}
          >
            Vision, Goals and Initiatives (VGIs)
          </Typography>
        }
      >
        {showModal?.type ? (
          <Modal
            title={showModal?.title}
            width={showModal?.type != "rationale" ? "72vw" : ""}
            maxHeight={showModal?.type != "rationale" ? "90vh" : ""}
            closeCallback={() =>
              setShowModal({
                type: null,
              })
            }
          >
            {showModal.type == "rationale" ? (
              <VgiRationaleContent text={showModal.val} />
            ) : (
              <VgiDialog
                vgiData={vgiData}
                empDataDispatch={empDataDispatch}
                curUserState={curUserState}
                snackbarStateUpdate={snackbarStateUpdate}
                employeeId={employeeId}
                type={showModal.type}
                closeCallback={() =>
                  setShowModal({
                    type: null,
                  })
                }
              />
            )}
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

        <Card
          sx={{
            width: "100%",
            //bgcolor: grey[100],
            //margin: "0 auto",
            paddingY: "0 !important",
            borderRadius: 0,
            boxShadow: 0,
          }}
        >
          {!vgiData.data ? (
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
                {vgiData.message}
                {/* Show Add VGI Icon when message is not Loader, logged in user is admin or he is 
                                      updating his own VGI
                                  */}
                {(curUserState.emp.data?.id == employeeId ||
                  curUserState.emp.data?.isAdmin) &&
                typeof vgiData.message != "object" ? (
                  <IconButton
                    size="small"
                    color="orange"
                    sx={{ padding: 0, marginLeft: 1 }}
                    onMouseEnter={(e) =>
                      handlePopoverOpen(
                        e,
                        vgiData?.message == "No Data" ? "Add VGIs" : "Add Goal"
                      )
                    }
                    onMouseLeave={handlePopoverClose}
                    onClick={() =>
                      setShowModal({
                        title:
                          vgiData?.message == "No Data"
                            ? "Add VGIs"
                            : "Add Goal",
                        type: "add",
                      })
                    }
                  >
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                ) : (
                  false
                )}
              </Typography>
            </Box>
          ) : (
            <CardContent sx={{ padding: "0 !important" }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "baseline",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    fontWeight="bold"
                    sx={{ minWidth: "6vw", color: "#666666" }}
                  >
                    Vision&nbsp;:
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "#666666",
                      fontSize: "16px",
                      width: "100%",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {!vgiData.data?.vision && !vgiData.data?.goals
                      ? "No Data"
                      : vgiData.data.vision != "(NULL)" && vgiData.data.vision
                      ? vgiData.data.vision
                          .split("<br />")
                          .map((t, i) => <Box key={i}>{t}</Box>)
                      : "I am thinking about it"}
                  </Typography>
                  <Box>
                    {curUserState.emp.data?.id == employeeId ||
                    curUserState.emp.data?.isAdmin ? (
                      <CustomizedMenus
                        vgiData={vgiData}
                        empDataDispatch={empDataDispatch}
                        snackbarStateUpdate={snackbarStateUpdate}
                        employeeId={employeeId}
                      />
                    ) : (
                      false
                    )}
                  </Box>
                </Box>
                <Box sx={{ marginTop: "1vh" }}>
                  {vgiData.data?.goals?.map((d, i) => (
                    <Box key={i}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="span"
                          fontWeight="bold"
                          sx={{
                            minWidth: "6vw",
                            color: theme.palette.green.dark,
                          }}
                        >
                          {`Goal ${i + 1}`}&nbsp;:
                        </Typography>

                        <Box sx={{ width: "100%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="body1"
                              component="div"
                              fontWeight="bold"
                              sx={{ color: theme.palette.green.dark }}
                            >
                              {d.goal}
                            </Typography>
                            <Box>
                              {vgiData.data?.empId ==
                                curUserState.emp.data?.employeeId ||
                              curUserState.emp.data?.isAdmin ? (
                                <IconButton
                                  size="small"
                                  color="orange"
                                  sx={{
                                    paddingY: 0,
                                    marginY: 0,
                                  }}
                                  onMouseEnter={(e) =>
                                    handlePopoverOpen(e, "Edit Goal")
                                  }
                                  onMouseLeave={handlePopoverClose}
                                  onClick={() =>
                                    setShowModal({
                                      title: "Edit Goal",
                                      type: `edit_${i}`,
                                    })
                                  }
                                >
                                  <CreateRoundedIcon fontSize="small" />
                                </IconButton>
                              ) : (
                                false
                              )}
                            </Box>
                          </Box>
                          {d.initiatives.map((i, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                              }}
                            >
                              {/* <Box> */}
                              <Typography
                                marginBottom="2vh"
                                variant="body2"
                                component="div"
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  <b>{`-`}&nbsp;&nbsp;</b>
                                  <Box>
                                    {i.initiative
                                      ?.split("<br />")
                                      .map((ini, index) => (
                                        <Box key={index}>{ini}</Box>
                                      ))}
                                  </Box>
                                </Box>
                              </Typography>
                              <Box sx={{ width: "10vw" }} />
                              {i.rationale?.trim().length ? (
                                <IconButton
                                  size="small"
                                  color="orange"
                                  sx={{ paddingY: 0, marginY: 0 }}
                                  onMouseEnter={(e) =>
                                    handlePopoverOpen(e, "Show Rationale")
                                  }
                                  onMouseLeave={handlePopoverClose}
                                  onClick={() =>
                                    setShowModal({
                                      val: i.rationale,
                                      title: "Rationale",
                                      type: "rationale",
                                    })
                                  }
                                >
                                  <InfoIcon fontSize="8px" />
                                </IconButton>
                              ) : null}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      {i < vgiData.data?.goals.length - 1 ? (
                        <Divider sx={{ color: "black", my: 1 }} />
                      ) : (
                        ""
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          )}
        </Card>
      </Accordion>
    </>
  );
}
