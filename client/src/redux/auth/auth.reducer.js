import { LOGIN, LOGOUT } from "../types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: null
};

const userReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...currentState,
        ...action.payload,
        isAuthenticated: true
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };

    default:
      return currentState;
  }
};

export default userReducer;
