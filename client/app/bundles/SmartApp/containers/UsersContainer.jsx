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

    const users = data.get('items').toJS(),
      errors = data.get('submitUserError'),
      isFetching = data.get('isFetching'),
      page = data.get('page'),
      query = data.get('query'),
      pages = data.get('pages');

    return (
      <div>
        {/*{isFetching &&*/}
          {/*<h2>Loading...</h2>*/}
        {/*}*/}
        <Users {...{ actions, users, errors, page, pages, query }} />
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