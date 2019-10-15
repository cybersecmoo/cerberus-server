import { LOGIN, LOGOUT, CHANGE_PASSWORD } from "../types";
import isEmpty from "../../helpers/isEmpty";
import jwt from "jsonwebtoken";

// We assume the JWT is valid, since it's from the server. Any validation checks here could be bypassed anyway because client-side things. Authorisation
// decisions aren't made using this anyway. Worst that can happen is that the user might be able to see empty pages if they tamper with the JWT
const decodeToken = token => {
  let decoded = { user: { id: "", name: "", isAdmin: false, hasLoggedInYet: false } };

  if (!isEmpty(token)) {
    decoded = jwt.decode(token);
  }

  return decoded;
};

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  user: decodeToken(localStorage.getItem("token")).user,
  isAuthenticated: !isEmpty(localStorage.getItem("token"))
};

const authReducer = (currentState = INITIAL_STATE, action) => {
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
        ...currentState,
        token: null,
        user: {
          id: "",
          name: "",
          isAdmin: false,
          hasLoggedInYet: false
        },
        isAuthenticated: false
      };

    case CHANGE_PASSWORD:
      localStorage.removeItem("token");

      return {
        ...currentState,
        token: null,
        user: {
          id: "",
          name: "",
          isAdmin: false,
          hasLoggedInYet: false
        },
        isAuthenticated: false
      };

    default:
      return currentState;
  }
};

export default authReducer;
