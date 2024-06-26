import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import CustomTextArea from "../../custom/CustomTextArea";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";
import ToolTip from "../../generic/Tooltip";
import Modal from "../../generic/Modal";
import ConfirmModalContent from "../ConfirmModalContent";
import { EMP_UPDATE_VGI_URL, EMP_VGI_DATA_URL } from "../../../utils/constants";
import { fetchData } from "../../../hooks/serviceHooks";
import { sendData } from "../../../utils/service";

function VgiDialog({
  closeCallback,
  vgiData,
  type,
  empDataDispatch,
  employeeId,
  snackbarStateUpdate,
}) {
  // Opens or closes the modal
  const [showModal, setShowModal] = React.useState({
    title: null,
    confirmCallback: null,
    message: null,
  });

  //Sets the initial state of VGI Modal
  const [selectedOptions, setSelectedOptions] = React.useState({
    vision: vgiData.message == "No Data" ? "" : vgiData.data?.vision,
    goal: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))]?.goal
      : "",
    initiative_0: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[0]?.initiative
      : "",
    rationale_0: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[0]?.rationale
      : "",
    initiative_1: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[1]?.initiative
      : "",
    rationale_1: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[1]?.rationale
      : "",
    initiative_2: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[2]?.initiative
      : "",
    rationale_2: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[2]?.rationale
      : "",
    initiative_3: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[3]?.initiative
      : "",
    rationale_3: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[3]?.rationale
      : "",
    initiative_4: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[4]?.initiative
      : "",
    rationale_4: type.includes("edit")
      ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[4]?.rationale
      : "",
  });

  // State for checking mandatory fields in VGI Modal
  const [validOptions, setSelectedValidOptions] = React.useState({
    vision: false,
    goal: false,
    initiative_0: false,
    rationale_0: false,
    initiative_1: false,
    rationale_1: false,
    initiative_2: false,
    rationale_2: false,
    initiative_3: false,
    rationale_3: false,
    initiative_4: false,
    rationale_4: false,
  });

  // State to maintain number of initiatives present in the modal
  const [initiativeList, setInitiativeList] = React.useState([
    { initiative: "", id: 1 },
  ]);

  // List for add new goals
  const [preparedList, setPreparedList] = React.useState({
    preparedListArr: [],
    type: null,
  });

  //State to check if the component is mounted or not
  const [isMounted, setIsMounted] = React.useState(false);

  //Sets the initiative list if the type is edit
  React.useEffect(() => {
    if (type.includes("edit")) {
      setInitialInitiativeList();
    }
    setIsMounted(true);
  }, []);

  //Removes the initiative on click of delete button
  const handleRemoveInitiative = (index) => {
    const list = [...initiativeList];
    var obj = {};
    for (var i = index; i < list.length; i++) {
      {
        obj["initiative_" + i] = selectedOptions["initiative_" + (i + 1)]
          ? selectedOptions["initiative_" + (i + 1)]
          : "";
        obj["rationale_" + i] = selectedOptions["rationale_" + (i + 1)]
          ? selectedOptions["rationale_" + (i + 1)]
          : "";
      }
    }
    list.splice(index, 1);
    setInitiativeList(list);
    setSelectedOptions({
      ...selectedOptions,
      ...obj,
    });
  };

  //Used to set number of initiative in the edit VGI Modal
  const setInitialInitiativeList = () => {
    var initiativeListLength =
      vgiData.data.goals[parseInt(type.slice(-1))].initiatives?.length;
    console.log(type.includes("edit"), initiativeListLength);
    if (type.includes("edit")) {
      let obj = [];
      for (var i = 0; i < initiativeListLength; i++) {
        obj.push({ initiative: "", id: i + 1 });
      }
      console.log(obj);
      setInitiativeList([...obj]);
    }
  };

  // Updates the VGIs on click of save or add new Goal
  React.useEffect(() => {
    if (isMounted) {
      if (preparedList.type == "save") {
        sendVgiData(
          EMP_UPDATE_VGI_URL,
          preparedList.preparedListArr,
          "Goals Updated Successfully"
        );
      } else {
        resetModal();
      }
    }
  }, [preparedList]);

  //Resets the VGI Modal to initial state
  const resetModal = () => {
    setInitiativeList([{ initiative: "", id: 1 }]);
    setSelectedValidOptions({
      vision: false,
      goal: false,
      initiative_0: false,
      rationale_0: false,
      initiative_1: false,
      rationale_1: false,
      initiative_2: false,
      rationale_2: false,
      initiative_3: false,
      rationale_3: false,
      initiative_4: false,
      rationale_4: false,
    });
    setSelectedOptions({
      vision:
        vgiData.message == "No Data"
          ? preparedList.preparedListArr.length != 0
            ? preparedList.preparedListArr[0].vision
            : 0
          : vgiData.data?.vision,
      goal: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))]?.goal
        : "",
      initiative_0: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[0]
            ?.initiative
        : "",
      rationale_0: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[0]?.rationale
        : "",
      initiative_1: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[1]
            ?.initiative
        : "",
      rationale_1: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[1]?.rationale
        : "",
      initiative_2: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[2]
            ?.initiative
        : "",
      rationale_2: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[2]?.rationale
        : "",
      initiative_3: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[3]
            ?.initiative
        : "",
      rationale_3: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[3]?.rationale
        : "",
      initiative_4: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[4]
            ?.initiative
        : "",
      rationale_4: type.includes("edit")
        ? vgiData.data.goals[parseInt(type.slice(-1))].initiatives[4]?.rationale
        : "",
    });
  };

  //Used to add one more initiative in VGI Modal on click of add initiative
  const handleAddInitiative = () => {
    let lastId = initiativeList[initiativeList.length - 1].id + 1;
    setInitiativeList([...initiativeList, { initiative: "", id: lastId }]);
  };

  //Handles the field input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
    setSelectedValidOptions({
      ...validOptions,
      [name]: false,
    });
  };

  //Sends the VGI data to backend and fetches the latest
  const sendVgiData = async (url, data, snackbarMessage) => {
    const pkId = employeeId;
    try {
      const res = await sendData(url, data);
      closeCallback();
      fetchData(empDataDispatch, "SET_EMP_VGI", EMP_VGI_DATA_URL + pkId);
      snackbarStateUpdate({
        type: "OPEN_SNACKBAR",
        payload: {
          message: snackbarMessage,
          severity: "success",
        },
      });
    } catch {
      snackbarStateUpdate({
        type: "OPEN_SNACKBAR",
        payload: {
          message: "VGI Upload Failed",
          severity: "error",
        },
      });
    }
  };

  //Handles the Edit VGI Save
  const handleEditVgi = () => {
    var goals = vgiData.data.goals;
    var additionalFieldLength = initiativeList.length - 1;
    var preparedData = [];
    // Prepare a list of all the goals
    for (var i = 0; i < goals.length; i++) {
      // Prepares a lit of all the goals except the edited one
      if (i == parseInt(type.slice(-1))) {
        var rowObj = {};
        for (var j = 0; j <= additionalFieldLength; j++) {
          rowObj = {
            employeeId: employeeId,
            vision: selectedOptions.vision,
            goal: selectedOptions.goal,
            initiative: selectedOptions["initiative" + "_" + j],
            rationale: selectedOptions["rationale" + "_" + j],
          };
          preparedData.push(rowObj);
        }
      } else {
        // Adds the edited goal to the list
        var iniObj = {
          employeeId: employeeId,
          vision: selectedOptions.vision,
          goal: goals[i].goal,
        };
        var initiatives = goals[i].initiatives;
        var rowObj = {};
        for (var j = 0; j < initiatives.length; j++) {
          rowObj = { ...iniObj };
          rowObj.initiative = initiatives[j].initiative;
          rowObj.rationale = initiatives[j].rationale;
          preparedData.push(rowObj);
        }
      }
    }

    sendVgiData(EMP_UPDATE_VGI_URL, preparedData, "Updated Successfully");
  };

  // Handler to delete a goal
  const handleDeleteGoal = () => {
    var goals = vgiData.data.goals;
    var preparedData = [];
    // Deletes the complete VGI if there is no goal
    if (goals.length == 1) {
      preparedData.push({
        employeeId: employeeId,
      });
      sendVgiData(
        EMP_UPDATE_VGI_URL,
        preparedData,
        "Goal Deleted Successfully"
      );
      return;
    }
    //Removes the deleted goal for the list and sends it to the backend
    for (var i = 0; i < goals.length; i++) {
      if (i != parseInt(type.slice(-1))) {
        var iniObj = {
          employeeId: employeeId,
          vision: selectedOptions.vision,
          goal: goals[i].goal,
        };
        var initiatives = goals[i].initiatives;
        var rowObj = {};
        for (var j = 0; j < initiatives.length; j++) {
          rowObj = { ...iniObj };
          rowObj.initiative = initiatives[j].initiative;
          rowObj.rationale = initiatives[j].rationale;
          preparedData.push(rowObj);
        }
      }
    }
    sendVgiData(EMP_UPDATE_VGI_URL, preparedData, "Goal Deleted Successfully");
  };

  //Handles the Add of new VGIs
  const handleAddVgi = () => {
    var preparedData = [];
    var additionalFieldLength = initiativeList.length - 1;
    // Add New VGIs if not already existing
    if (vgiData.message == "No Data") {
      for (var i = 0; i <= additionalFieldLength; i++) {
        var rowObj = {
          employeeId: employeeId,
          vision: selectedOptions.vision,
          goal: selectedOptions.goal,
          initiative: selectedOptions["initiative" + "_" + i],
          rationale: selectedOptions["rationale" + "_" + i],
        };
        preparedData.push(rowObj);
      }
      sendVgiData(
        EMP_UPDATE_VGI_URL,
        preparedData,
        "Vision Updated Successfully"
      );
    } else {
      // Adds a new goal
      var goals = vgiData.data.goals;
      for (var i = 0; i < goals.length; i++) {
        var iniObj = {
          employeeId: employeeId,
          vision: selectedOptions.vision,
          goal: goals[i].goal,
        };
        // Checks if the goal is already existing
        if (iniObj.goal == selectedOptions.goal) {
          snackbarStateUpdate({
            type: "OPEN_SNACKBAR",
            payload: {
              message: "Goal already existing",
              severity: "error",
            },
          });
          return;
        }
        // Prepares a list for all the existing goals
        var initiatives = goals[i].initiatives;
        for (var j = 0; j < initiatives.length; j++) {
          let rowObj = { ...iniObj };
          rowObj.initiative = initiatives[j].initiative;
          rowObj.rationale = initiatives[j].rationale;
          preparedData.push(rowObj);
        }
      }
      // Add the new goal to the list
      for (var i = 0; i <= additionalFieldLength; i++) {
        var rowObj = {
          employeeId: employeeId,
          vision: selectedOptions.vision,
          goal: selectedOptions.goal,
          initiative: selectedOptions["initiative" + "_" + i],
          rationale: selectedOptions["rationale" + "_" + i],
        };
        preparedData.push(rowObj);
      }
      sendVgiData(
        EMP_UPDATE_VGI_URL,
        preparedData,
        "New Goal Added Successfully",
        type
      );
    }
    closeCallback(); //Closes the modal
  };

  // Handles modication of vision
  const handleModifyVision = () => {
    // Checks if the goal is already existing
    if (!selectedOptions?.vision?.trim()) {
      snackbarStateUpdate({
        type: "OPEN_SNACKBAR",
        payload: {
          message: "Please enter a vision",
          severity: "error",
        },
      });
      return;
    }
    var preparedData = [];
    var goals = vgiData.data.goals;
    // Prepares a list of all existing goals with the modified vision
    for (var i = 0; i < goals.length; i++) {
      var iniObj = {
        employeeId: employeeId,
        vision: selectedOptions.vision,
        goal: goals[i].goal,
      };
      var initiatives = goals[i].initiatives;
      for (var j = 0; j < initiatives.length; j++) {
        let rowObj = { ...iniObj };
        rowObj.initiative = initiatives[j].initiative;
        rowObj.rationale = initiatives[j].rationale;
        preparedData.push(rowObj);
      }
    }
    sendVgiData(
      EMP_UPDATE_VGI_URL,
      preparedData,
      "Vision updated successfully",
      type
    );
  };

  // Handles Add New Goals
  const handleAddGoals = (type) => {
    let preparedData = [];
    let additionalFieldLength = initiativeList.length - 1;
    // Adds all the exisiting goal to the list
    if (preparedList.preparedListArr.length == 0) {
      if (vgiData.data?.goals != undefined) {
        var goals = vgiData.data.goals;
        for (var i = 0; i < goals.length; i++) {
          var iniObj = {
            employeeId: employeeId,
            vision: selectedOptions.vision,
            goal: goals[i].goal,
          };
          var initiatives = goals[i].initiatives;
          for (var j = 0; j < initiatives.length; j++) {
            let rowObj = { ...iniObj };
            rowObj.initiative = initiatives[j].initiative;
            rowObj.rationale = initiatives[j].rationale;
            preparedData.push(rowObj);
          }
        }
      }
      // Adds the first new goal to the list
      for (var i = 0; i <= additionalFieldLength; i++) {
        var rowObj = {
          employeeId: employeeId,
          vision: selectedOptions.vision,
          goal: selectedOptions.goal,
          initiative: selectedOptions["initiative" + "_" + i],
          rationale: selectedOptions["rationale" + "_" + i],
        };
        preparedData.push(rowObj);
      }
      setPreparedList({
        preparedListArr: [...preparedList.preparedListArr, ...preparedData],
        type: type,
      });
    } else {
      // Adds all the new goals to the list
      for (let i = 0; i <= additionalFieldLength; i++) {
        let rowObj = {
          employeeId: employeeId,
          vision: selectedOptions.vision,
          goal: selectedOptions.goal,
          initiative: selectedOptions["initiative" + "_" + i],
          rationale: selectedOptions["rationale" + "_" + i],
        };
        preparedData.push(rowObj);
      }
      setPreparedList({
        preparedListArr: [...preparedList.preparedListArr, ...preparedData],
        type: type,
      });
    }
  };

  const handleDeleteBtnClick = () => {
    setShowModal({
      title: "Delete Goal",
      confirmCallback: handleDeleteGoal,
      message:
        "Are you sure you want to continue? This will delete your selected goal",
    });
  };

  const handleEditBtnClick = () => {
    var fieldCheck = true;

    var additionalFieldList = [
      "initiative_1",
      "rationale_1",
      "initiative_2",
      "rationale_2",
      "initiative_3",
      "rationale_3",
      "initiative_4",
      "rationale_4",
    ];

    var obj = {};
    var additionalFieldLength = initiativeList.length - 1;
    for (const key in selectedOptions) {
      var fieldIndex = key.split("_")[1];
      if (
        !selectedOptions[key]?.trim() &&
        additionalFieldList.indexOf(key) == -1
      ) {
        obj[key] = true;
      } else if (
        !selectedOptions[key]?.trim() &&
        additionalFieldList.indexOf(key) != -1 &&
        additionalFieldLength >= fieldIndex
      ) {
        obj[key] = true;
      }
    }
    setSelectedValidOptions({
      ...validOptions,
      ...obj,
    });

    if (Object.keys(obj).length != 0) {
      fieldCheck = false;
    }

    if (!fieldCheck) {
      snackbarStateUpdate({
        type: "OPEN_SNACKBAR",
        payload: {
          message: "Please fill all the mandatory fields",
          severity: "error",
        },
      });
      return;
    }
    handleEditVgi();
  };

  //Mandatory check for add goals or save
  const handleAddBtnClick = (type) => {
    var fieldCheck = true;

    var additionalFieldList = [
      "initiative_1",
      "rationale_1",
      "initiative_2",
      "rationale_2",
      "initiative_3",
      "rationale_3",
      "initiative_4",
      "rationale_4",
    ];

    var obj = {};
    var additionalFieldLength = initiativeList.length - 1;
    for (const key in selectedOptions) {
      var fieldIndex = key.split("_")[1];
      if (
        !selectedOptions[key]?.trim() &&
        additionalFieldList.indexOf(key) == -1
      ) {
        obj[key] = true;
      } else if (
        !selectedOptions[key]?.trim() &&
        additionalFieldList.indexOf(key) != -1 &&
        additionalFieldLength >= fieldIndex
      ) {
        obj[key] = true;
      }
    }
    setSelectedValidOptions({
      ...validOptions,
      ...obj,
    });

    if (Object.keys(obj).length != 0) {
      fieldCheck = false;
    }

    if (!fieldCheck) {
      snackbarStateUpdate({
        type: "OPEN_SNACKBAR",
        payload: {
          message: "Please fill all the mandatory fields",
          severity: "error",
        },
      });
      return;
    }
    if (type == "save" || type == "saveNewGoal") {
      handleAddGoals(type);
    } else {
      handleAddVgi(type);
    }
  };

  const handleCloseModal = () => {
    if (preparedList.preparedListArr.length == 0) {
      setShowModal({
        title: null,
        confirmCallback: null,
        message: null,
      });
    } else {
      sendVgiData(
        EMP_UPDATE_VGI_URL,
        preparedList.preparedListArr,
        "Goals Updated Successfully"
      );
    }
  };

  //Opens confirmation modal on cancel button click
  const handleCancel = () => {
    if (preparedList.preparedListArr.length > 0) {
      setShowModal({
        title: "Confim Cancel",
        confirmCallback: handleCloseModal,
        message:
          "This goal will not be updated. Are you sure you want to cancel",
      });
    } else {
      closeCallback();
    }
  };

  const gridProps = {
    item: true,
    xs: 11,
    sx: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center !important",
      paddingLeft: "8vh !important",
    },
  };

  return (
    <>
      {showModal.title ? (
        <Modal
          title={showModal.title}
          closeCallback={handleCloseModal}
          width="30vw"
        >
          <ConfirmModalContent
            handleConfirm={showModal.confirmCallback}
            closeModalAction={handleCloseModal}
            message={showModal.message}
          />
        </Modal>
      ) : null}
      <DialogContent>
        <Grid container spacing={3} sx={{ paddingTop: "3vh" }}>
          <Grid {...gridProps}>
            <VisibilityIcon sx={{ color: "action.active", mr: 1.5, my: 1.8 }} />
            <CustomTextArea
              label="Vision"
              name={"vision"}
              width={"90vw"}
              rows={1}
              value={selectedOptions?.vision}
              onChange={handleInputChange}
              error={validOptions?.vision}
              disabled={
                type.includes("edit") ||
                (vgiData.data?.vision && type != "modifyVision") ||
                preparedList.preparedListArr.length != 0
                  ? true
                  : false
              }
            />
          </Grid>
          {type != "modifyVision" ? (
            <Grid {...gridProps}>
              <FlagIcon sx={{ color: "action.active", mr: 1.5, my: 1.8 }} />
              <CustomTextArea
                label="Goal"
                name="goal"
                width={"90vw"}
                rows={1}
                value={selectedOptions.goal}
                onChange={handleInputChange}
                error={validOptions.goal}
              />
            </Grid>
          ) : null}
          {type != "modifyVision"
            ? initiativeList.map((singleInitiative, index) => (
                <React.Fragment key={singleInitiative.id}>
                  <Grid {...gridProps}>
                    <DirectionsRunIcon
                      sx={{ color: "action.active", mr: 1.5, my: 1.8 }}
                    />
                    <CustomTextArea
                      label="Initiative"
                      name={"initiative" + "_" + index}
                      width="100%"
                      rows={2}
                      value={selectedOptions["initiative" + "_" + index]}
                      onChange={handleInputChange}
                      error={validOptions["initiative" + "_" + index]}
                    />
                  </Grid>
                  <Grid
                    item={true}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center !important",
                      pr: "0 !important",
                      pl: "0 !important",
                    }}
                    xs={1}
                  >
                    {index == initiativeList.length - 1 &&
                    initiativeList.length < 5 ? (
                      <>
                        <ToolTip title="Add Initiative">
                          <IconButton
                            component="span"
                            onClick={() => handleAddInitiative(index)}
                            sx={{
                              pr: 0,
                              pl: 0.2,
                              mr: 0,
                            }}
                            disableRipple
                          >
                            <AddBoxRoundedIcon
                              fontSize="large"
                              sx={{
                                color: "#FC7500",
                              }}
                            />
                          </IconButton>
                        </ToolTip>
                        {initiativeList.length != 1 ? (
                          <ToolTip title="Remove Initiative">
                            <IconButton
                              component="span"
                              onClick={() => handleRemoveInitiative(index)}
                              sx={{
                                pr: 0,
                                pl: 0,
                              }}
                              disableRipple
                            >
                              <DeleteRoundedIcon
                                fontSize="large"
                                sx={{ color: "#FC7500" }}
                              />
                            </IconButton>
                          </ToolTip>
                        ) : (
                          false
                        )}
                      </>
                    ) : (
                      <ToolTip title="Remove Initiative">
                        <IconButton
                          component="span"
                          onClick={() => handleRemoveInitiative(index)}
                        >
                          <DeleteRoundedIcon
                            fontSize="large"
                            sx={{ color: "#FC7500" }}
                          />
                        </IconButton>
                      </ToolTip>
                    )}
                  </Grid>
                  <Grid {...gridProps}>
                    <LightbulbIcon
                      sx={{ color: "action.active", mr: 1.5, my: 1.8 }}
                    />
                    <CustomTextArea
                      label="Rationale"
                      name={"rationale" + "_" + index}
                      width={"90vw"}
                      rows={2}
                      value={selectedOptions["rationale" + "_" + index]}
                      onChange={handleInputChange}
                      error={validOptions["rationale" + "_" + index]}
                    />
                  </Grid>
                </React.Fragment>
              ))
            : null}
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        {!type.includes("edit") && !type.includes("modifyVision") ? (
          <>
            <Button
              onClick={() => {
                if (preparedList.preparedListArr.length == 0) {
                  handleAddBtnClick();
                } else {
                  handleAddBtnClick("save");
                }
              }}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                handleAddBtnClick("saveNewGoal");
              }}
              startIcon={<AddIcon />}
            >
              Add New Goal
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                if (type == "modifyVision") {
                  handleModifyVision();
                } else {
                  handleEditBtnClick();
                }
              }}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              sx={{ display: type == "modifyVision" ? "none" : "" }}
              onClick={handleDeleteBtnClick}
              startIcon={<DeleteRoundedIcon />}
            >
              Delete
            </Button>
          </>
        )}
        <Button onClick={handleCancel} startIcon={<CloseIcon />}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
}
export default VgiDialog;
