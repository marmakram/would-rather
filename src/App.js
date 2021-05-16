import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react'
import AppHeader from './components/app-header';
import './App.css';

import AnswerQuestion from './components/answer-question';
import Login from './components/login';
import Home from './components/home';
import SummaryQuestion from './components/summary-question';
import Leaderboard from './components/leaderboard'
import AddQuestion from './components/new-question';
import NotFound from './common/not-found';
import { _getUsers, _getQuestions } from './_DATA';
import { PrivateRoute } from './common/PrivateRoute';
import { RECEIVE_DATA } from './constants'


class App extends React.Component {

  componentDidMount() {
    this.props.handleInitialData();//dispatch(GetData())
  }

  render() {
    const { userId } = this.props.authUser;
    return (
      <BrowserRouter>
        <AppHeader>
        </AppHeader>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute authUser={userId} path="/leaderboard" component={Leaderboard} />
          <PrivateRoute authUser={userId} path="/home" component={Home} />
          <PrivateRoute authUser={userId} exact path="/" component={Home} />
          <PrivateRoute authUser={userId} path="/view-question/:question_id" component={AnswerQuestion} />
          <PrivateRoute authUser={userId} path="/question/:question_id" component={SummaryQuestion} />
          <PrivateRoute authUser={userId} path="/add" component={AddQuestion} />
          <Route path='/404' component={NotFound} />
          <Route path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }

}

const mapStateToProps = state => {
  console.log("Comp App, mapStateToProps,, ", state.authUserReducer);
  return { authUser: state.authUserReducer }
};

let retreiveData = (users, questions) => {
  return {
    type: RECEIVE_DATA,
    users,
    questions
  }
}

function GetData() {
  return (dispatch) => {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => {
      console.log("dispatch users,, ", users);
      dispatch(retreiveData(users, questions));
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      return dispatch(GetData())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)//mapStateToProps
