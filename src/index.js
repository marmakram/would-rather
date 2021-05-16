
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import users from './reducers/user-reducer';
import questionsReducer from './reducers/question-reducer';
import authUserReducer from './reducers/auth-user-reducer';
import thunk from 'redux-thunk'


const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('The action: ', action)
  const result = next(action)
  console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}

const store = createStore(combineReducers({
  users,
  questionsReducer,
  authUserReducer
}), applyMiddleware(thunk, logger));//checker

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
