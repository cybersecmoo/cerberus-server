import { LOGIN, LOGOUT } from "../types";
import { setAlert } from "../alert/alert.action";
import { authorizationHeaders } from "../../helpers/auth";
import axios from "axios";

export const login = ({ name, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ name, password });

  try {
    const response = await axios.post("/api/auth/", body, config);

    dispatch({
      type: LOGIN,
      payload: response.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const logout = () => async dispatch => {
  const config = authorizationHeaders();

  try {
    const response = await axios.delete("/api/auth/", config);

    dispatch({
      type: LOGOUT,
      payload: response.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
