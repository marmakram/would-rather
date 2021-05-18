import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux'

import users from './reducers/user-reducer';
import questionsReducer from './reducers/question-reducer';
import authUserReducer from './reducers/auth-user-reducer';
import thunk from 'redux-thunk'

import Login from './components/login';
import QuestionDetail from './components/question-detail';

let store = createStore(combineReducers({
  users,
  questionsReducer,
  authUserReducer
}), applyMiddleware(thunk));

test('renders without crashing', () => {
  //checker
  render((<Provider store={store}>
    <App />
  </Provider>));
});

test('renders without crashing', () => {
  render(<Login store={store} />);
});

test('renders without crashing', () => {
  let passing = {};
  let params = {}
  params['question_id']='am8ehyc8byjqgar0jgpub9'
  
  passing['params'] =params
  render(<Provider store={store}><BrowserRouter>
    <QuestionDetail match={passing} />
  </BrowserRouter></Provider>);
});