import React from "react";
import { getData } from "../utils/service";
import { LOGIN_USER_DATA } from "../utils/constants";
import CircularLoader from "../components/generic/CircularLoader";

export const getLoggedInEmpDetails = async (email, dispatch) => {
  try {
    const res = await getData(LOGIN_USER_DATA + email);
    if (res.status == 200 && res.data.status == "SUCCESS") {
      if (!res.data.data) {
        dispatch({
          type: "SET_EMPLOYEE_DETAILS",
          payload: {
            data: null,
            message: res.data.message || "Data not present",
          },
        });
      } else {
        dispatch({
          type: "SET_EMPLOYEE_DETAILS",
          payload: {
            data: res.data.data,
            message: "Success",
          },
        });
      }
    } else {
      dispatch({
        type: "SET_EMPLOYEE_DETAILS",
        payload: {
          data: null,
          message: "No Data",
        },
      });
    }
  } catch (e) {
    dispatch({
      type: "SET_EMPLOYEE_DETAILS",
      payload: {
        data: null,
        message: "Some error occured",
      },
    });
  }
};

export const fetchData = async (dispatch, actionType, URL) => {
  dispatch({
    type: actionType,
    payload: { data: null, message: <CircularLoader /> },
  });
  try {
    const res = await getData(URL);
    if (res.status == 200 && res.data.status == "SUCCESS") {
      if (!res.data.data) {
        dispatch({
          type: actionType,
          payload: {
            data: null,
            message: "No Data" || res.data.message,
          },
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
        payload: { data: null, message: "No Data" },
      });
    }
  } catch (e) {
    dispatch({
      type: actionType,
      payload: { data: null, message: "Some error occured" },
    });
  }
};

export const fetchEmployeeData = async (setState, URL) => {
  try {
    const res = await getData(URL);
    if (res.status == 200 && res.data.status == "SUCCESS") {
      if (!res.data.data) {
        setState({
          data: null,
          message: "No Data" || res.data.message,
        });
      } else {
        setState({
          data: res.data.data,
          message: "Success",
        });
      }
    } else {
      setState({
        data: null,
        message: "No Data",
      });
    }
  } catch (e) {
    setState({
      data: null,
      message: "Some error occured",
    });
  }
};
