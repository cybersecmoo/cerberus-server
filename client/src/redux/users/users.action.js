import { DELETE_USER, FETCH_USERS, CREATE_USER } from "../types";
import { setAlert } from "../alert/alert.action";
import { authorizationHeaders } from "../../helpers/auth";
import axios from "axios";

export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`, authorizationHeaders());

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
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  try {
    const response = await axios.get("/api/users/", config);
    dispatch({
      type: FETCH_USERS,
      payload: response.data.allUsers
    });
  } catch (err) {
    setAlert(err, "danger");
  }
};

export const createUser = ({ name, initialPassword, isAdmin }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  try {
    const data = { name, initialPassword, isAdmin };
    const response = await axios.post("/api/users/", data, config);
    dispatch({
      type: CREATE_USER,
      payload: response.data.user
    });
  } catch (err) {
    setAlert(err, "danger");
  }
};
