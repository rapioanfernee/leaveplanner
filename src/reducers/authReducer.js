import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER_USER,
  FAIL
} from "../actions/action-types";

const INITIAL_STATE = {
  isSignedIn: null,
  user: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        isSignedIn: true,
        user: { ...action.payload },
        error: null
      };
    }

    case SIGN_IN: {
      return {
        ...state,
        isSignedIn: true,
        user: { ...action.payload },
        error: null
      };
    }

    case SIGN_OUT: {
      return { ...state, isSignedIn: false, user: null, error: null };
    }

    case FAIL(REGISTER_USER) || FAIL(SIGN_IN): {
      return {
        ...state,
        error: { ...action.payload }
      };
    }

    default: {
      return state;
    }
  }
};
