import {
  REQUEST_USERS, RECEIVE_USERS
} from '../constants/sessionConstants';
import axios from 'axios';
// // Uses the API middlware to get users
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
    type: REQUEST_USERS,
  }
}

function receiveUsers(response) {
  return {
    type: RECEIVE_USERS,
    users: response.data.users
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export default function fetchUsers() {

  return dispatch => {
    dispatch(requestUsers());

    return axios.get('/api/v1/users',{
      // authenticity_token: ReactOnRails.authenticityToken(),
      headers: { 'Authorization': localStorage.getItem('smart_token')}
    })
    .then(function (response) {
      dispatch(receiveUsers(response))
    })
    .catch((err) => function(){
      console.log("Error: ", err);
    })
  }
}