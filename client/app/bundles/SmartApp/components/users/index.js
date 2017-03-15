import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cyan500, cyan800, grey200, darkWhite} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import User from './User';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import UsersSearchForm from './UsersSearchForm';

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
export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: {
        username: '',
        email: '',
      },
      errors: {},
      message: 'User created succesfullly'
    };
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleUserNameChange =(e) => {
    var newUser = this.state.user;
    newUser.username = e.target.value;
    this.setState({user: newUser});
  }

  handleEmailChange =(e) =>{
    var newUser = this.state.user;
    newUser.email = e.target.value;
    this.setState({user: newUser});
  }

  handleCreateUser =(e) => {
    var self = this;
    e.preventDefault();
    // self.props.handleSubmitUser(self.state.user);
    const { actions } = this.props;
    actions
      .submitUser(this.state.user)
      .then(this.resetAndFocus);

  }
  resetAndFocus =() => {

    var self =  this;
    if(self.props.errors.size > 0) {
      self.setState({errors: self.props.errors.toJS()})
    } else {
      self.setState({user: {username: '', email: ''}, errors: {}, open: false})
    }
  }

  handleSearch =(query) => {
    const { actions } = this.props;
    actions.fetchUsers(query)
  };

  render() {
    const {users} = this.props;
    var that = this;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return(
      <Paper  style={styles.paper}>
        <Subheader>Users</Subheader>
        <div>
          <UsersSearchForm handleSearch={this.handleSearch} />
        </div>
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
        <br/>
        <FloatingActionButton onTouchTap={this.handleOpen} >
          <ContentAdd />
        </FloatingActionButton>
        <br/>

        <Dialog
          title="New User"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div>
            <TextField
              errorText={this.state.errors.username}
              floatingLabelText="Username"
              onChange={this.handleUserNameChange}
              value={this.state.user.username}
            /><br />
            <TextField
              errorText={this.state.errors.email}
              floatingLabelText="Email"
              onChange={this.handleEmailChange}
              value={this.state.user.email}
            /><br />

            <FlatButton
              label="Create User"
              primary={true}
              onTouchTap={this.handleCreateUser}
            />
          </div>
        </Dialog>
      </Paper>
    )
  }
}
// const Users =({users}) => (
//
//
// );
//
//
// export default Users;