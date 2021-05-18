
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap'
import QuestionList from './question-list'
import mapStateWithSelectToProps from '../selectors/home-selector'

import React from 'react';

class Home extends React.Component {

    handleanswred(e, q) {
        e.history.push({ pathname: "/questions/" + q, state: { questionId: q } })
    }

    render() {
        return (
            <div>
                <h1>Leaderboard</h1>
                <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
                    <Tab eventKey="unanswered" title={"Unanswered Questions  ( " + this.props.unanswered.length + " )"}>
                        {<QuestionList handleView={this.handleanswred} questions={this.props.unanswered} users={this.props.users} ></QuestionList>}
                    </Tab>
                    <Tab eventKey="answered" title={"Answered Questions  ( " + this.props.answered.length+ " )"}>
                        {<QuestionList handleView={this.handleanswred} questions={this.props.answered} users={this.props.users}></QuestionList>}
                    </Tab>
                </Tabs>
            </div>);
    }
}

 function mapStateToProps({ questionsReducer, authUserReducer, users }) {
    const questions = questionsReducer;
    const { userId } = authUserReducer;
    let unanswered = Object.keys(questions).filter(a => {
        if (questions[a].optionOne.votes.filter(v1 => v1 === userId).length > 0)
            return false;
        if (questions[a].optionTwo.votes.filter(v1 => v1 === userId).length > 0)
            return false;
        return true;
    }).map(a => questions[a])
    .sort(function(a, b){return b.timestamp-a.timestamp});

    let answered = Object.keys(questions).filter(a => {
        if (unanswered.filter(x => x.id === a).length > 0)
            return false;
        return true;
    }).map(a => questions[a])
    .sort(function(a, b){return b.timestamp-a.timestamp});
    return {
        answered,
        unanswered,
        users
    }
} 
export default connect(mapStateWithSelectToProps)(Home)