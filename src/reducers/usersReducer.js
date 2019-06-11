import _ from "lodash";
import { FETCH_USERS } from "../actions/action-types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS: {
      return { ...state, users: action.payload };
    }
    default: {
      return state;
    }
  }
};
