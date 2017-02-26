import React, { Component, PropTypes } from 'react'

export default class Login extends Component {
  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <input type='text' ref='login' className="form-control"  placeholder='Username/Email'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>

        {errorMessage &&
        <p>{errorMessage}</p>
        }
      </div>
    )
  }
  handleClick(event) {
    const login = this.refs.login
    const password = this.refs.password
    const creds = { login: login.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
}
Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}