import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import thankfulReducer from "./thankfulReducers.js";
import goalReducer from "./goalReducers.js";
import auth from "./auth.js";

export default combineReducers({
  form: formReducer,
  thankful: thankfulReducer,
  goal: goalReducer,
  auth
});
