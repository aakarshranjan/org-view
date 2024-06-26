import React from "react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { styled } from "@mui/material/styles";
import { handleSignIn } from "../../hooks/authHooks";
import { CurUserStateUpdateContext } from "../../utils/empState";
import bg from "../../assets/login_bg.jpg";

//Used to style the login Page
const LoginPageWrapper = styled("div")(({}) => ({
  backgroundImage: `url(${bg})`,
  backgroundAttachment: "fixed",
  backgroundRepeat: "round",
  marginTop: "3vh",
  height: "95vh",
  backgroundSize: "cover",
}));

const Login = ({ instance, children }) => {
  const dispatch = React.useContext(CurUserStateUpdateContext);
  return (
    <LoginPageWrapper>
      <Button
        onClick={() => handleSignIn(instance, dispatch)}
        style={{
          position: "absolute",
          right: "3vw",
          padding: "1vh",
          margin: 0,
          height: "5vh",
          display: "flex",
        }}
      >
        Login with AD
        <LoginIcon sx={{ paddingLeft: "1vh" }} />
      </Button>
      {children}
    </LoginPageWrapper>
  );
};

export default Login;
