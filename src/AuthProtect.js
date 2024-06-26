import React from "react";
import BackdropLoading from "./components/custom/BackdropLoading";
import Login from "./components/views/Login";

const AuthProtect = ({ loginStatus, instance, children }) => {
  return loginStatus.inProgress ? (
    <Login instance={instance}>
      <BackdropLoading loading={true} login={true} />
    </Login>
  ) : loginStatus.status ? (
    children
  ) : (
    <Login instance={instance} />
  );
};
export default AuthProtect;
