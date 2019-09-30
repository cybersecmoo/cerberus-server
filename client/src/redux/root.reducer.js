import alertReducer from "./alert/alert.reducer";
import authReducer from "./auth/auth.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer
});
