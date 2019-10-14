import { LOGIN, LOGOUT, CHANGE_PASSWORD } from "../types";
import isEmpty from "../../helpers/isEmpty";

// We keep things in localStorage so that they persist between page reloads
const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: !isEmpty(localStorage.getItem("token")),
  hasLoggedInYet: !isEmpty(localStorage.getItem("hasLoggedInYet"))
};

const authReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("hasLoggedInYet", action.payload.hasLoggedInYet);

      return {
        ...currentState,
        ...action.payload,
        isAdmin: action.payload.isAdmin,
        isAuthenticated: true,
        hasLoggedInYet: action.payload.hasLoggedInYet
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("hasLoggedInYet");

      return {
        ...currentState,
        token: null,
        isAdmin: false,
        isAuthenticated: false,
        hasLoggedInYet: false
      };

    case CHANGE_PASSWORD:
      localStorage.setItem("hasLoggedInYet", true);
      return {
        ...currentState,
        hasLoggedInYet: true
      };

    default:
      return currentState;
  }
};

export default authReducer;
