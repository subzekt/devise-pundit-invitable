import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';

function mapStateToProps(state){
  const { auth } = state;
  const { isClientAuthenticated, errorMessage, user } = auth;
  const isAuthenticated = user && isClientAuthenticated;

  return {
    user,
    isAuthenticated,
    errorMessage
  }
};

export default connect(mapStateToProps)(Layout);
