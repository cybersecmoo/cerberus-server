import { LOGIN, LOGOUT, CHANGE_PASSWORD } from "../types";
import { setAlert } from "../alert/alert.action";
import { authorizationHeaders } from "../../helpers/auth";
import axios from "axios";

// TODO: Fix error handling; current method doesn't show the verbose messages from the response
export const login = ({ name, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ name, password });

  try {
    const response = await axios.post("/api/auth/", body, config);
    const errors = response.data.errors;

    if (errors.length !== 0) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
        type: LOGIN,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, "danger"));
  }
};

export const changePassword = ({ password }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  const body = JSON.stringify({ newPassword: password });

  try {
    const response = await axios.post("/api/users/update_password", body, config);
    const errors = response.data.errors;

    if (errors.length !== 0) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, "danger"));
  }
};

export const logout = () => async dispatch => {
  const config = authorizationHeaders();

  try {
    const response = await axios.delete("/api/auth/", config);
    const errors = response.data.errors;

    if (errors.length !== 0) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
        type: LOGOUT,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, "danger"));
  }
};
