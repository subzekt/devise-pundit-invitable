import { connect } from 'react-redux';
import Users from '../components/users/index';
import React, {Component, PropTypes} from 'react';
import fetchUsers from '../actions/usersActionCreators'



class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers())
  }

  render() {
    const { items, isFetching } = this.props;
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
  const { items, isFetching } = users;

  return {
    items,
    isFetching
  }
};

export default connect(mapStateToProps)(UsersContainer);