const BASE_URL = 'http://localhost:3000/api/v1'
import axios from 'axios';

function callApi(endpoint) {
  let token = localStorage.getItem('smart_token') || null
  let config = {}

  // if(authenticated) {
  //   if(token) {
  //     config = {
  //       headers: { 'Authorization': `${token}` }
  //     }
  //   } else {
  //     throw "No token saved!"
  //   }
  // }

  if(token) {
    config = {
      headers: { 'Authorization': `${token}` }
    }
  } else {
    throw "No token saved!"
  }

  // export function (url, method) {
  //   return function(dispatch) {
  //     dispatch(requestData());
  //     return axios({
  //       url: url,
  //       method: 'get'
  //     })
  //       .then(function(response) {
  //         dispatch(receiveData(response.data));
  //       })
  //       .catch(function(response){
  //         dispatch(receiveError(response.data));
  //         dispatch(pushState(null,'/error'));
  //       })
  //   }

  return axios.get(url, config).then(
    function(response) {
      return response
    }
  ).catch(err => console.log("Error: ", err));
  // return fetch(BASE_URL + endpoint, config)
  //   .then(response =>
  //     response.text()
  //       .then(text => ({ text, response }))
  //   ).then(({ text, response }) => {
  //     if (!response.ok) {
  //       return Promise.reject(text)
  //     }
  //     return text
  //   }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types } = callAPI

  const [ USERS_SUCCESS, USERS_FAILURE ] = types

  return callApi(endpoint).then(
    response =>
      next({
        response,
        type: USERS_SUCCESS
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: USERS_FAILURE
    })
  )
}