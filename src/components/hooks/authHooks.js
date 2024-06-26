import { getLoggedInEmpDetails } from "./serviceHooks";
import { setAxiosHeader, postData, getData } from "../utils/service";
import {
  APP_LOGIN_URL,
  APP_REFRESH_URL,
  APP_LOGOUT_URL,
  azureClientId,
  azureTenantId,
  azureRedirectURI,
} from "../utils/constants";

export async function signOutClickHandler(instance, dispatch) {
  dispatch({
    type: "SET_LOGIN_STATUS",
    payload: {
      inProgress: true,
      status: true,
    },
  });
  try {
    const logoutRequest = {
      //   account: instance.getAccountByHomeId(accounts[0].homeAccountId),
      // mainWindowRedirectUri: "/",
      postLogoutRedirectUri: "/",
    };
    await instance.logoutPopup(logoutRequest);
    //logout audit api call
    handleLogout();
  } catch (e) {
    console.error("logout error ", e);
  }
  dispatch({
    type: "SET_LOGIN_STATUS",
    payload: {
      inProgress: false,
      status: false,
    },
  });
  dispatch({ type: "LOGOUT_EMPLOYEE" });
}

export async function handleSignIn(instance, dispatch) {
  const loginReqParam = {
    scopes: [`${azureClientId}/.default`],
    redirectUri: azureRedirectURI,
  };
  try {
    dispatch({
      type: "SET_LOGIN_STATUS",
      payload: {
        inProgress: true,
        status: false,
      },
    });

    let res = await instance.loginPopup(loginReqParam);
    handleLogin(res, dispatch);
  } catch (e) {
    try {
      localStorage.setItem("login-init", "true");
      instance.loginRedirect(loginReqParam);
      //no need to dispatch and change the login status here as the the above line will cause to run the
      //app again as the root route will be hit again
    } catch (e) {
      console.log("error in ", e);
      dispatch({
        type: "SET_LOGIN_STATUS",
        payload: {
          inProgress: false,
          status: false,
        },
      });
      localStorage.setItem("login-init", "false");
    }
  }
}

async function refreshAccessToken() {
  try {
    console.log("refresh token running");
    var refreshKey = `${accounts[0].homeAccountId}-login.windows.net-refreshtoken-${azureClientId}----`;
    var refreshTokenObj = JSON.parse(sessionStorage.getItem(refreshKey));
    var refreshSecret = refreshTokenObj.secret;
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", azureClientId);
    urlencoded.append("refresh_token", refreshSecret);
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("scope", `${azureClientId}/.default`);

    let res = await fetch(
      `https://login.microsoftonline.com/${azureTenantId}/oauth2/v2.0/token`,
      {
        method: "POST",
        body: urlencoded,
      }
    );
    let r = await res.json();
    setAxiosHeader(
      `${r.token_type} ${window.btoa(
        `${r.access_token}::tokenEmailDelimiter::${accounts[0].username}`
      )}`
    );
    //refresh api call
    let exp = r.expires_in * 1000;
    setTimeout(() => {
      refreshAccessToken();
    }, exp - 2000);
    // console.log(r);
  } catch (e) {
    console.log("error in refresh ", e);
    localStorage.setItem("login-init", "false");
    window.location.reload();
  }
}

export async function getToken(instance, accounts, dispatch) {
  try {
    dispatch({
      type: "SET_LOGIN_STATUS",
      payload: {
        inProgress: true,
        status: false,
      },
    });
    let res = await instance.acquireTokenSilent({
      scopes: [`${azureClientId}/.default`],
      account: accounts[0],
    });
    handleLogin(res, dispatch);
  } catch (e) {
    console.log("error token ", e);
    dispatch({
      type: "SET_LOGIN_STATUS",
      payload: {
        inProgress: false,
        status: false,
      },
    });
    throw e;
  }
}

const getRefresh = async (dispatch) => {
  try {
    const res = await getData(APP_REFRESH_URL);
    if (res.data.success && res.data.data.email) {
      setAxiosHeader(
        `Bearer ${window.btoa(
          `${res.data.data.token}::tokenEmailDelimiter::${res.data.data.email}`
        )}`
      );
      refreshJwt(res.data.data.exp, dispatch);
    } else {
      console.error("Auth token refresh failed");
      window.location.reload();
    }
  } catch (e) {
    console.error("Something went wrong! Authentication failed", e);
    window.location.reload();
  }
};

export const refreshJwt = (exp, dispatch) => {
  let duration = new Date(exp) - Date.now();
  // console.log(duration);
  setTimeout(() => {
    console.log("running refresh", Date.now());
    getRefresh(dispatch);
  }, duration - 2000);
};

const handleLogin = async (cred, dispatch) => {
  try {
    const res = await fetch(APP_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: window.btoa(
        `${cred.accessToken}::tokenEmailDelimiter::${cred.account.username}`
      ),
    });
    const data = await res.json();
    if (data.success && data.data.email) {
      setAxiosHeader(
        `Bearer ${window.btoa(
          `${data.data.token}::tokenEmailDelimiter::${cred.account.username}`
        )}`
      );

      let loginObj = {
        email: cred.account.username,
        fullName: cred.account.name,
      };
      dispatch({ type: "LOGIN_EMPLOYEE", payload: loginObj });
      dispatch({
        type: "SET_LOGIN_STATUS",
        payload: {
          inProgress: false,
          status: true,
        },
      });
      getLoggedInEmpDetails(loginObj.email, dispatch);
      localStorage.setItem("login-init", "false");

      refreshJwt(data.data.exp, dispatch);
      return true;
    }
  } catch (e) {
    console.error("Something went wrong! Authentication failed ", e);
    throw e;
  }
  return false;
};

const handleLogout = async () => {
  try {
    const res = await postData(APP_LOGOUT_URL);
    return res.data.success;
  } catch (e) {
    console.error("Something went wrong! Logout Failed", e);
    throw e;
  }
};
