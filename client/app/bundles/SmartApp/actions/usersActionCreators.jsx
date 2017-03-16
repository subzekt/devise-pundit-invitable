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

function receiveUsers(data, query) {
  return {
    type: actionTypes.RECEIVE_USERS,
    users: data.users,
    page: data.page,
    pages: data.pages,
    query: query
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

export  function fetchUsers(query, page = 1) {
  let params = { query: query, page: page};

  return dispatch => {
    dispatch(requestUsers());

    return (
      requestsManager
        .fetchEntities('users', params)
        .then(res => dispatch(receiveUsers(res.data, query)))
        .catch(error => console.log("Error: ", error))
    );
  }
}

export function submitUser(user) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return (
      requestsManager
        .submitEntity( {user}, 'users')
        .then(res => dispatch(submitUserSuccess(res.data)))
        // .catch(error => function(){
        //   debugger
        //   dispatch(submitUserFailure(error))
        // })
        .catch(error => {
          if(error.response != undefined) {
            dispatch(submitUserFailure(error.response.data.errors))
          } else {
            dispatch(submitUserFailure(error))
          }
        })
    );
  };
}
