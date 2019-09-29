import { LOGIN } from "../types";

const INITIAL_STATE = {
  token: null
};

const userReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...currentState,
        token: action.payload
      };
    default:
      return currentState;
  }
};

export default userReducer;
