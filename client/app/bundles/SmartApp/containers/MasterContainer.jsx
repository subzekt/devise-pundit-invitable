import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';

function mapStateToProps(state){
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user,
    isAuthenticated,
    errorMessage
  }
};

export default connect(mapStateToProps)(Layout);
