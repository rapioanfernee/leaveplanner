import {
  FETCH_LEAVE_LOGS,
  FETCH_LEAVE_LOG,
  EDIT_LEAVE_LOGS,
  DELETE_LEAVE_LOGS,
  NEW_LEAVE_LOG,
  FETCH_LEAVE_TYPES
} from "../actions/action-types";

import _ from "lodash";

const INITIAL_STATE = {
  leaveLogs: [],
  selectedLeaveLog: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LEAVE_LOGS: {
      if (action.payload === null) {
        return { ...state };
      } else {
        return { ...state, leaveLogs: [...action.payload] };
      }
    }
    case FETCH_LEAVE_LOG: {
      return { ...state, selectedLeaveLog: action.payload };
    }
    case NEW_LEAVE_LOG: {
      return {
        ...state,
        leaveLogs: [...state.leaveLogs, action.payload]
      };
    }
    default: {
      return state;
    }
  }
};
