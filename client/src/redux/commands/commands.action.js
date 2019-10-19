import { DELETE_COMMAND_TYPE, FETCH_COMMAND_TYPES, CREATE_COMMAND_TYPE } from "../types";
import { setAlert } from "../alert/alert.action";
import { axiosConfig } from "../../helpers/axiosConfig";
import axios from "axios";

export const deleteCommandType = id => async dispatch => {
  try {
    const config = {
      ...axiosConfig,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    await axios.delete(`/api/commands/types/${id}`, config);

    dispatch({
      type: DELETE_COMMAND_TYPE,
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

export const fetchCommandTypes = () => async dispatch => {
  const config = {
    ...axiosConfig,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  try {
    const response = await axios.get("/api/commands/types", config);
    const errors = response.data.errors;

    if (errors.length !== 0) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
        type: FETCH_COMMAND_TYPES,
        payload: response.data.allCommandTypes
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, "danger"));
  }
};

export const createCommandType = ({ name, numArgs }) => async dispatch => {
  const config = {
    ...axiosConfig,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  try {
    const data = { name, numArgs };
    const response = await axios.post("/api/commands/types/create", data, config);
    const errors = response.data.errors;

    if (errors.length !== 0) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(`Added user ${name}`, "success"));
      dispatch({
        type: CREATE_COMMAND_TYPE,
        payload: response.data.commandType
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, "danger"));
  }
};
