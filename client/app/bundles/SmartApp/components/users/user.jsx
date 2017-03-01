import React from 'react';
const User = (user) => (
  <tr>
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td>{(user.user_access_role || {}).name}</td>
    <td>{user.temp_password}</td>
  </tr>
);
export default User;