import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import foodReducer from "./foodReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  food: foodReducer
});
