import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const User = ({user}) => (
  <TableRow>
    <TableRowColumn>{user.username}</TableRowColumn>
    <TableRowColumn>{user.email}</TableRowColumn>
    <TableRowColumn>{user.temp_password}</TableRowColumn>
  </TableRow>
);
export default User;
// export default class extends React.Component {
//   render() {
//     const {user} = this.props;
//     return (
//       <TableRow>
//         <TableRowColumn>{user.username}</TableRowColumn>
//         <TableRowColumn>{user.email}</TableRowColumn>
//         <TableRowColumn>{user.temp_password}</TableRowColumn>
//       </TableRow>
//     )
//   }
// }