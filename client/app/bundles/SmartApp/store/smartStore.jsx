import { createStore } from 'redux';
import helloWorldReducer from '../reducers/sessionReducer';

const configureStore = (railsProps) => (
  createStore(helloWorldReducer, railsProps)
);

export default configureStore;
