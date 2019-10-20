import alertReducer from "./alert/alert.reducer";
import authReducer from "./auth/auth.reducer";
import usersReducer from "./users/users.reducer";
import commandsReducer from "./commands/commands.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  users: usersReducer,
  commands: commandsReducer
});
