import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cyan500, cyan800, grey200, darkWhite} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import User from './User';

let styles = {
  root: {
    // backgroundColor: lightBlue800,
    marginTop: 10,
    color: 'white',
    padding: 0
  },
  table: {
    width: '100%',
    minWidth: 1200,
  },
  wrapper: {
    padding: 0,
    background: 'red'
  },
  paper: {
    // backgroundColor: canvasColor,
    // marginBottom: 32,
    padding: 10
  },
};

const showCheckBoxes= false;
// export default class Users extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     debugger;
//     return(
//       'Hello World'
//     )
//   }
// }
const Users =({users}) => (

  <Paper  style={styles.paper}>
    <Subheader>Users</Subheader>
    <Table selectable={showCheckBoxes} style={styles.table} fixedHeader={false} bodyStyle={{'overflow-x': 'auto'}}>
      <TableHeader displaySelectAll={showCheckBoxes}
                   adjustForCheckbox={showCheckBoxes}
      >
        <TableRow>
          <TableHeaderColumn>UserName</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
          <TableHeaderColumn>Password</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={showCheckBoxes} >
        {
          users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
    <br/><br/>
  </Paper>
);


export default Users;