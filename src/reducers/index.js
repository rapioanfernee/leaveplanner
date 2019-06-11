import { combineReducers } from "redux";
import leavelogsReducer from "./leavelogsReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";

import { SIGN_OUT } from "../actions/action-types";

const appReducer = combineReducers({
  auth: authReducer,
  leaveLogs: leavelogsReducer,
  users: usersReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
