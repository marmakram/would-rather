
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap'
import QuestionList from './question-list'

/* 
create 2 tabs */

import React from 'react';

class Home extends React.Component {

    handleanswred(e, q) {
        e.history.push({ pathname: "/question/" + q, state: { questionId: q } })
    }
    handleUnanswred(e, q) {
        e.history.push({ pathname: "/view-question/" + q, state: { questionId: q } })
        /* return (<Redirect push
            to={{
                pathname: "/view-question",
                state: { questionId: e }
            }}
        />); */
    }

    render() {
        return (
            <div>
                <h1>Leaderboard</h1>
                <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
                    <Tab eventKey="unanswered" title={"Unanswered Questions  ( " + this.props.unanswered.length + " )"}>
                        {<QuestionList handleView={this.handleUnanswred} questions={this.props.unanswered} users={this.props.users} ></QuestionList>}
                    </Tab>
                    <Tab eventKey="answered" title={"Answered Questions  ( " + this.props.answered.length+ " )"}>
                        {<QuestionList handleView={this.handleanswred} questions={this.props.answered} users={this.props.users}></QuestionList>}
                    </Tab>
                </Tabs>
            </div>);
    }
}

function mapStateToProps({ questionsReducer, authUserReducer, users }) {
    console.log("Comp home, mapStateToProps,, ", { questionsReducer, authUserReducer });
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
    console.log('unanswered ', unanswered);
    console.log('answered ', answered);
    return {
        answered,
        unanswered,
        users
    }
}
export default connect(mapStateToProps)(Home)