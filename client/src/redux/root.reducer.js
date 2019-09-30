import alertReducer from "./alert/alert.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  alert: alertReducer
});
