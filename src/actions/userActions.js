import { FETCH_USERS, CREATE_USER } from "./action-types";

export const fetchUsers = () => async dispatch => {
  const response = "";
  dispatch({ type: FETCH_USERS, payload: response.data });
};

export const createUser = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = "";
  dispatch({ type: CREATE_USER, payload: response.data });
  // history.push("/people");
};
