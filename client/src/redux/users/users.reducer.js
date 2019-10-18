import { DELETE_USER, FETCH_USERS, CREATE_USER } from "../types";

const INITIAL_STATE = {
  allUsers: []
};

const usersReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_USER:
      const remainingUsers = currentState.allUsers.filter(user => {
        return user._id !== action.payload.id;
      });

      return {
        ...currentState,
        allUsers: remainingUsers
      };

    case FETCH_USERS:
      return {
        ...currentState,
        allUsers: action.payload
      };

    case CREATE_USER:
      currentState.allUsers.push(action.payload);
      return {
        ...currentState
      };

    default:
      return currentState;
  }
};

export default usersReducer;
