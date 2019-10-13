import { LOGIN, LOGOUT, CHANGE_PASSWORD } from "../types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: false
};

const authReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...currentState,
        ...action.payload,
        isAdmin: action.payload.isAdmin,
        isAuthenticated: true,
        hasLoggedInYet: action.payload.hasLoggedInYet
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...currentState,
        token: null,
        isAdmin: false,
        isAuthenticated: false,
        hasLoggedInYet: false
      };

    case CHANGE_PASSWORD:
      localStorage.removeItem("token");
      return {
        ...currentState,
        token: null,
        isAdmin: false,
        isAuthenticated: false,
        hasLoggedInYet: true
      };

    default:
      return currentState;
  }
};

export default authReducer;
