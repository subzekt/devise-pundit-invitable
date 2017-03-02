import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';

function mapStateToProps(state){
  const { auth, users } = state;
  const { isClientAuthenticated, errorMessage, user } = auth;
  const isAuthenticated = user && isClientAuthenticated;

  return {
    user,
    isAuthenticated,
    errorMessage,
    users
  }
};

export default connect(mapStateToProps)(Layout);
