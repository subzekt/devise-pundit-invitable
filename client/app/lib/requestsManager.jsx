import request from 'axios';
const BASE_URL = 'http://localhost:3000/api/v1/'


export default {
  token :localStorage.getItem('smart_token') || null,
  /**
   * Retrieve list of entities from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchEntities(endpoint) {
    return request({
      method: 'GET',
      url: BASE_URL+endpoint,
      headers: { 'Authorization': `${this.token}` },
      responseType: 'json',
    });
  },

  /**
   * Submit new entity to server using AJAX call.
   *
   * @param {Object} entity - Request body to post.
   * @returns {Promise} - Result of ajax call.
   */
  submitEntity(entity, endpoint) {
    return request({
      method: 'POST',
      url: BASE_URL+endpoint,
      responseType: 'json',
      headers: { 'Authorization': `${this.token}` },
      data: entity,
    });
  },

};
