import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AnswerQuestion from './answer-question';
import SummaryQuestion from './summary-question';

class QuestionDetail extends React.Component {


    render() {
        const isAnswered = this.props.isAnswered;
        let questionId = this.props.questionId
        return isAnswered === true ? <SummaryQuestion questionId={questionId} />: <AnswerQuestion questionId={questionId} />;
        
    }
}

function mapStateToProps({authUserReducer, users }, props) {
    let questionId = props.match.params.question_id;
    const isAnswered = users.length >0 && Object.keys(users[authUserReducer.userId].answers).filter(a => a === questionId).length > 0;
    return {
        isAnswered,
        questionId
    }
}
export default connect(mapStateToProps)(QuestionDetail)