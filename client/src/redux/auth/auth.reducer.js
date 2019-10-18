import { LOGIN, LOGOUT, CHANGE_PASSWORD, LOCAL_LOGOUT } from "../types";
import isEmpty from "../../helpers/isEmpty";
import jwt from "jsonwebtoken";

// We assume the JWT is valid, since it's from the server. Any validation checks here could be bypassed anyway because client-side things. Authorisation
// decisions aren't made using this anyway. Worst that can happen is that the user might be able to see empty pages if they tamper with the JWT
const decodeToken = token => {
  let toke = { user: { id: "", name: "", isAdmin: false, hasLoggedInYet: false } };

  if (!isEmpty(token)) {
    const decoded = jwt.decode(token);

    // expiry is in seconds since UNIX epoch
    if (decoded.exp * 1000 > Date.now()) {
      toke = decoded;
    }
  }

  return toke;
};

const INITIAL_STATE = {
  user: decodeToken(localStorage.getItem("token")).user,
  isAuthenticated: !isEmpty(decodeToken(localStorage.getItem("token")).user.id)
};

const authReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);

      return {
        ...currentState,
        user: decodeToken(action.payload.token).user,
        isAuthenticated: true
      };

    // This removes the locally-stored token, which will then prompt the user to log in again
    // This helps when the token has expired (re-login will renew the token in the DB)
    case LOCAL_LOGOUT:
      localStorage.removeItem("token");

      return {
        ...currentState,
        user: {
          id: "",
          name: "",
          isAdmin: false,
          hasLoggedInYet: false
        },
        isAuthenticated: false
      };

    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...currentState,
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
