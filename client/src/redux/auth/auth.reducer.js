import { LOGIN, LOGOUT, CHANGE_PASSWORD } from "../types";
import isEmpty from "../../helpers/isEmpty";
import jwt from "jsonwebtoken";

// We assume the JWT is valid, since it's from the server. Any validation checks here could be bypassed anyway because client-side things. Authorisation
// decisions aren't made using this anyway. Worst that can happen is that the user might be able to see empty pages if they tamper with the JWT
const decodeToken = token => {
  let toke = { user: { id: "", name: "", isAdmin: false, hasLoggedInYet: false } };

  if (!isEmpty(token)) {
    const decoded = jwt.decode(token);

    if (decoded.exp > Date.now()) {
      toke = decoded;
    }
  }

  return toke;
};

// FIXME: log the user out if their token has expired
const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  user: decodeToken(localStorage.getItem("token")).user,
  isAuthenticated: !isEmpty(decodeToken(localStorage.getItem("token")).user.id)
};

const authReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);

      return {
        ...currentState,
        token: action.payload.token,
        user: decodeToken(action.payload.token).user,
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
