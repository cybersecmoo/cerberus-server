import { DELETE_USER, FETCH_USERS, CREATE_USER } from "../types";
import { setAlert } from "../alert/alert.action";
import { axiosConfig } from "../../helpers/axiosConfig";
import axios from "axios";

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      ...axiosConfig,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: DELETE_USER,
      payload: {
        id
      }
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const fetchUsers = () => async dispatch => {
  const config = {
    ...axiosConfig,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  try {
    const response = await axios.get("/api/users/", config);
    const errors = response.data.errors;

    if (errors.length !== 0) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
        type: FETCH_USERS,
        payload: response.data.allUsers
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, "danger"));
  }
};

export const createUser = ({ name, password, isAdmin }) => async dispatch => {
  const config = {
    ...axiosConfig,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  try {
    const data = { name, password, isAdmin };
    const response = await axios.post("/api/users/", data, config);
    const errors = response.data.errors;

    if (errors.length !== 0) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(`Added user ${name}`, "success"));
      dispatch({
        type: CREATE_USER,
        payload: response.data.user
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, "danger"));
  }
};
