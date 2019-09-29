const { combineReducers } = require("redux");
const userReducer = require("./user/user.reducer");

export default combineReducers({
  user: userReducer
});
