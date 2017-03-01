import React, {Component} from 'react';
import User from './user';

export default class Users extends Component{

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchTerm: "",
      message: "",
      errors: {},
      user: {
        username: '',
        email: '',
      },
    }
  }

  handleUserNameChange =(e) => {
  var newUser = this.state.user;
  newUser.username = e.target.value;
  this.setState({user: newUser});
}

handleEmailChange =(e) => {
  var newUser = this.state.user;
  newUser.email = e.target.value;
  this.setState({user: newUser});
}

handleSearchTermChange =(e) => {
  this.setState({searchTerm: e.target.value});
}

handleUsersSearch =() => {
  var that = this;
  $.ajax({
    method: 'GET',
    data: {
      search: that.state.searchTerm,
    },
    url: '/users.json',
    success: function(res) {
      that.setState({
        users: res,
        errors: {},
        message: ''
      });
    },
    error: function(res) {
      that.setState({errors: res.responseJSON.errors});
    }
  });
}

handleShowAll =(option) => {
  var that = this;
  var previousSearchTerm = that.state.searchTerm;
  if (previousSearchTerm != "") {
    that.setState({showAll: option, searchTerm: ''}, function() {
      this.handleUsersSearch(that);
    });

  } else {
    that.setState({showAll: option, searchTerm: ''});
  }
}

handleCreateUser =() => {
  var that = this;
  $.ajax({
    method: 'POST',
    data: {
      user: that.state.user,
    },
    url: '/users.json',
    success: function(res) {
      var newUsersList = that.state.users;
      newUsersList.push(res);
      that.setState({
        users: newUsersList,
        user: {
          username: '',
          email: '',
        },
        errors: {},
        message: 'User created succesfullly'
      });
    },
    error: function(res) {
      that.setState({message: '', errors: res.responseJSON.errors})
    }
  });
}

render() {
  var that = this;
  var users = this.state.users.map( function(user) {
    return (
      <User user={user} key={user.id} />
    );
  });
  return (
    <div>
    <ul className="nav nav-pills">
    <li className = { this.state.showAll ? "active" : "" }><a onClick={() => this.handleShowAll(true)} >All Users</a></li>
  <li className = { this.state.showAll ? "" : "active" }><a onClick={() => this.handleShowAll(false)} >New User</a></li>
  </ul>
  <div className="clearfix search-form">
    <div className= {this.state.showAll ? "" : "hide"}>
<div className="col-sm-3">
    <div className="form-group label-floating is-empty">
    <label className="control-label">Enter Username or Email</label>

  <input className="form-control" value={this.state.searchTerm} type="text" onChange={this.handleSearchTermChange} />
</div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
    <button className="btn btn-raised btn-primary" onClick={this.handleUsersSearch}>Search</button>
  </div>
  </div>
  </div>

  <div className= {this.state.showAll ? "hide" : ""}>

<div className="col-sm-4">
    <div className='form-inputs'>
    <div className="form-group label-floating string optional user_username">
    <label className="string optional control-label">Username</label>
    <input className="string optional form-control" type="text" value={this.state.user.username} onChange={this.handleUserNameChange} />
<span style={{color: 'red'}}>{this.state.errors.username}</span>
  </div>
  </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group label-floating email optional user_email">
    <label className="email optional control-label">Email</label>
    <input className="string optional form-control" type="text" value={this.state.user.email} onChange={this.handleEmailChange} />
<span style={{color: 'red'}}>{this.state.errors.email}</span>
  </div>
  </div>
  <div className='form-actions'>

    </div>
    <div className="col-sm-4">
    <div className="form-group">
    <button onClick={this.handleCreateUser} className="btn btn-raised btn-primary">Create User</button>
  </div>
  </div>

  <div className="result clearfix">{ this.state.message }</div>
  </div>
  </div>



  <table className="table">
    <thead>
    <tr>
    <th>User Name</th>
  <th>Email</th>
  <th>Role</th>
  <th>Action</th>
  </tr>
  </thead>
  <tbody>
  {users}
  </tbody>
  </table>
  </div>
);
}
};