import * as actionTypes from '../constants/userConstants';

import requestsManager from 'lib/requestsManager';//
// Uses the API middlware to get users
// export default function fetchUsers() {
//   return {
//     [CALL_API]: {
//       endpoint: 'users',
//       types: [USERS_SUCCESS, USERS_FAILURE],
//     }
//   }
// }
function requestUsers() {
  return {
    type: actionTypes.REQUEST_USERS,
  }
}

function receiveUsers(data) {
  return {
    type: actionTypes.RECEIVE_USERS,
    users: data.users
  }
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING,
  };
}

export function submitUserSuccess(user) {
  return {
      type: actionTypes.SUBMIT_USER_SUCCESS,
      user,
  };
}

export function submitUserFailure(error) {
  return {
      type: actionTypes.SUBMIT_USER_FAILURE,
      error,
  };
}

export default function fetchUsers() {

  return dispatch => {
    dispatch(requestUsers());

    return (
      requestsManager
        .fetchEntities('users')
        .then(res => dispatch(receiveUsers(res.data)))
        .catch(error => console.log("Error: ", error))
    );
  }
}

export function submitUser(user) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return (
      requestsManager
        .submitEntity('users/new',{ user })
        .then(res => dispatch(submitUserSuccess(res.data)))
        .catch(error => dispatch(submitUserFailure(error)))
    );
  };
}
