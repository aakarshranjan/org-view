import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  CurUserStateContext,
  CurUserStateUpdateContext,
  curUserReducer,
  curUserInitialState,
  SnackbarContext,
  SnackbarUpdateContext,
  snackbarInitialState,
  snackbarReducer,
} from "./utils/state";

const RouteHandler = () => {
  const [curUserState, curUserDispatch] = React.useReducer(
    curUserReducer,
    curUserInitialState
  );
  const [snackbarState, snackbarDispatch] = React.useReducer(
    snackbarReducer,
    snackbarInitialState
  );

  const navigate = useNavigate();

  React.useEffect(() => {}, []);

  return (
    <CurUserStateContext.Provider value={curUserState}>
      <CurUserStateUpdateContext value={curUserDispatch}>
        <SnackbarContext value={snackbarState}>
          <SnackbarUpdateContext value={snackbarDispatch}>
            <Routes>
              <Route
                path="/"
                element={<App loginStatus={curUserState.loginStatus} />}
              >
                <Route path="/" element={<Employee />} />
                <Route path="employee" element={<Employee />} />
                <Route path="employee/:empPkId" element={<Employee />} />
                <Route path="department" element={<Employee />} />
                <Route path="search/:deptId" element={<Employee />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </SnackbarUpdateContext>
        </SnackbarContext>
      </CurUserStateUpdateContext>
    </CurUserStateContext.Provider>
  );
};

export default RouteHandler;
