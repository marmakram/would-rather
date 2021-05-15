import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react'
import AppHeader from './components/app-header';
import './App.css';

import AnswerQuestion from './components/answer-question';
import Login from './components/login';
import Home from './components/home';
import SummaryQuestion from './components/summary-question';
import AddQuestion from './components/new-question';
import NotFound from './components/not-found';
import { _getUsers, _getQuestions } from './_DATA';

import { RECEIVE_DATA } from './constants'


class App extends React.Component {

  componentDidMount() {
    this.props.handleInitialData();//dispatch(GetData())
  }

  render() {
    const { userId } = this.props.authUser;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route component={(state) => {
            let v = ['/', '/home', '/view-question', '/question', '/question/add']
              .filter(z => z === state.location.pathname);
            if (v.length <= 0) {
              return <div>
                <AppHeader>
                </AppHeader>
                <Route path='*' component={NotFound} />
              </div>
            }
            return !userId ? <Redirect to="/login" /> : (//
              <div>
                <AppHeader>
                </AppHeader>
                <Route path="/home" component={Home} />
                <Route exact path="/" component={Home} />
                <Route path="/view-question" component={AnswerQuestion} />
                <Route path="/question" component={SummaryQuestion} />
                <Route path="/question/add" component={AddQuestion} />
                <Route path='*' component={NotFound} />
              </div >)
          }
          } />
          {/* */}
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
