import { SIGN_IN, SIGN_OUT, REGISTER_USER, FAIL } from "./action-types";

import firebase from "../firebase/Firebase";

export const checkAuth = () => async dispatch => {
  const response = await firebase.getCurrentUser();
  if (response === null) {
    dispatch({
      type: SIGN_OUT
    });
  } else {
    const { email, displayName, photoURL, uid, phoneNumber } = response;
    dispatch({
      type: SIGN_IN,
      payload: {
        email,
        displayName,
        photoURL,
        uid,
        phoneNumber
      }
    });
  }
};

export const signIn = formValues => async dispatch => {
  const { email, password } = formValues;
  firebase.login(email, password).then(
    async res => {
      const response = await firebase.getCurrentUser();
      const { email, displayName, photoURL, uid, phoneNumber } = response;
      dispatch({
        type: SIGN_IN,
        payload: {
          email,
          displayName,
          photoURL,
          uid,
          phoneNumber
        }
      });
    },
    error => {
      dispatch({
        type: FAIL(SIGN_IN),
        payload: error
      });
    }
  );
};

export const signOut = () => async dispatch => {
  await firebase.logout();
  dispatch({
    type: SIGN_OUT
  });
};

export const signInGoogle = () => async dispatch => {
  const response = await firebase.loginWithGoogle();
  dispatch({
    type: SIGN_IN,
    payload: response.user
  });
};

export const registerUser = formValues => async (dispatch, getState) => {
  const { first_name, last_name, email, password } = formValues;

  firebase.register(first_name, last_name, email, password).then(
    async res => {
      const response = await firebase.getCurrentUser();
      const { email, displayName, photoURL, uid, phoneNumber } = response;
      dispatch({
        type: REGISTER_USER,
        payload: {
          email,
          displayName,
          photoURL,
          uid,
          phoneNumber
        }
      });
    },
    error => {
      dispatch({
        type: FAIL(REGISTER_USER),
        payload: error
      });
    }
  );
};
