import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import PositionedSnackbar from "./components/generic/Snackbar";
import AppBar from "./components/generic/AppBar";
import Drawer from "./components/generic/Drawer";
import UserInfo from "./components/custom/UserInfo";
import { SnackbarContext, SnackbarUpdateContext } from "./utils/empState";

const App = ({ loginStatus, instance }) => {
    const snackbarState = React.useContext(SnackbarContext);
    const snackbarStateUpdate = React.useContext(SnackbarUpdateContext);

    return (
    <Box style={{ height: "auto", overflowY: "hidden" }}>
        <PositionedSnackbar
        snackbarDetails={snackbarState}
        onSnackbarClose={() =>
            snackbarStateUpdate({
            type: "CLOSE_SNACKBAR",
            })
        }
        />
        <AppBar instance={instance} />
        <Drawer children={<UserInfo />} />
        <Box
            style={{
            marginLeft: "23vw",
            marginTop: "8vh",
            marginRight: "2vh",
            background: "rgb(227, 242, 253)",
            minHeight: "90vh",
            borderTopLeftRadius: "4vh",
            borderTopRightRadius: "4vh",
            }}
        >
            <Outlet />
        </Box>
    </Box>
    );
};

export default App;
