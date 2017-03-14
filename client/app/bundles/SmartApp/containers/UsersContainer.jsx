import { connect } from 'react-redux';
import Users from '../components/users/index';
import React, {Component, PropTypes} from 'react';
import * as usersActionCreators from '../actions/usersActionCreators'
import { bindActionCreators } from 'redux';


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.dispatch(usersActionCreators.fetchUsers())
  }

  handleSubmitUser =(user)=>{
    this.props.dispatch(submitUser(user))
  }

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(usersActionCreators, dispatch);

    const users = data.get('items').toJS();
    const errors = data.get('submitUserError');
    const isFetching = data.get('isFetching');

    return (
      <div>
        {isFetching &&
          <h2>Loading...</h2>
        }
        { users.length > 0 &&
          <Users {...{ actions, users, errors }} />
        }
      </div>

    )
  }
}

function mapStateToProps(state){
  const { users } = state;
  return {
    data: users
  }
};

export default connect(mapStateToProps)(UsersContainer);