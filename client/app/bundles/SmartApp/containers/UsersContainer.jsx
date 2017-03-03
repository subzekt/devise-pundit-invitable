import { connect } from 'react-redux';
import Users from '../components/users/index';
import React, {Component, PropTypes} from 'react';
import fetchUsers from '../actions/usersActionCreators'



class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers())
  }

  render() {
    const { data } = this.props;
    const items = data.get('items').toJS();
    const isFetching = data.get('isFetching');

    return (
      <div>
        {isFetching &&
          <h2>Loading...</h2>
        }
        {items.length > 0 &&
          <Users users={items}/>
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