import {
  FETCH_LEAVE_LOGS,
  FETCH_LEAVE_LOG,
  NEW_LEAVE_LOG
} from "./action-types";

import firebase from "../firebase/Firebase";

import history from "../history";

export const fetchLeaveLogs = () => async (dispatch, getState) => {
  const { uid } = getState().auth.user;
  const leaveRef = firebase.ref.child(`${uid}/leaves`);
  await leaveRef.once(
    "value",
    snap => {
      let leaves = snap.val();

      leaves
        ? (leaves = Object.keys(leaves).map(key => {
            const test = snap.val()[key];
            return {
              id: key,
              ...test
            };
          }))
        : (leaves = null);

      dispatch({ type: FETCH_LEAVE_LOGS, payload: leaves });
    },
    error => {
      dispatch({ type: "FETCH_LEAVE_LOGS_FAIL", payload: error });
    }
  );
};

export const fetchLeaveLog = leaveId => async (dispatch, getState) => {
  const { uid } = getState().auth.user;
  const leaveRef = firebase.ref.child(`${uid}/leaves/${leaveId}`);
  await leaveRef.once(
    "value",
    snap => {
      const leaves = snap.val();

      dispatch({
        type: FETCH_LEAVE_LOG,
        payload: {
          ...leaves,
          id: leaveId
        }
      });
    },
    error => {
      dispatch({ type: "FETCH_LEAVE_LOG_FAIL", payload: error });
    }
  );
};
export const newLeaveLog = formValues => async (dispatch, getState) => {
  const { uid } = getState().auth.user;
  const leaveRef = firebase.ref.child(`${uid}/leaves`);
  const response = await leaveRef
    .push()
    .set({
      ...formValues,
      uid
    })
    .then(() => {
      return {
        data: {
          ...formValues,
          uid
        }
      };
    })
    .catch(error => {
      return {
        data: error
      };
    });
  dispatch({ type: NEW_LEAVE_LOG, payload: response.data });
  history.push("/leaveplanner/leavelogs");
};
