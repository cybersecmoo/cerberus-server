import { DELETE_COMMAND_TYPE, FETCH_COMMAND_TYPES, CREATE_COMMAND_TYPE } from "../types";

const INITIAL_STATE = {
  allCommandTypes: []
};

const commandsReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_COMMAND_TYPE:
      const remainingTypes = currentState.allCommandTypes.filter(command => {
        return command._id !== action.payload.id;
      });

      return {
        ...currentState,
        allCommandTypes: remainingTypes
      };

    case FETCH_COMMAND_TYPES:
      return {
        ...currentState,
        allCommandTypes: action.payload
      };

    case CREATE_COMMAND_TYPE:
      currentState.allCommandTypes.push(action.payload);
      return {
        ...currentState
      };

    default:
      return currentState;
  }
};

export default commandsReducer;
