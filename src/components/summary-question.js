import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap'

class SummaryQuestion extends React.Component {

    handleAnser() {
        this.props.history.push({ pathname: "/" })
    }

    render() {
        const quest = this.props.question;
        const op1 = !quest ? 0 : quest.optionOne.votes.length;
        const op2 = !quest ? 0 : quest.optionTwo.votes.length;
        let opRatio1 = Math.round((op1 / (op1 + op2)) * 100);
        let opRatio2 = Math.round((op2 / (op1 + op2)) * 100);

        return quest && (<div className="container">
            <div className="row">
                <div className="col-md-10">
                    <div><span className="name">{this.props.users[quest.author].name + " "}</span> 
                     asks would you rather ..  </div>
                    <div style={{ textAlign: 'start' }}>
                        <p> 
                          <ProgressBar now={opRatio1} label={`${opRatio1}%`} />
                            {quest.optionOne.text}
                        </p>
                    </div>
                    <div style={{ textAlign: 'start' }}>
                    <p> 
                          <ProgressBar now={opRatio2} label={`${opRatio2}%`} />
                            {quest.optionTwo.text}
                        </p>
                    </div>
                    <button style={{ maxWidth: 200 }} className="btn btn-primary"
                        onClick={(e) => this.handleAnser()}>Close</button>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state, props) {
    let { questionsReducer, authUserReducer, users } = state;
    let questionId = props.location.state ? props.location.state.questionId : null;
    const questions = questionsReducer;

    const { userId } = authUserReducer;
    console.log("quest,, ");

    return {
        userId,
        users,
        question: questionId ? questions[questionId] : null
    }
}
export default connect(mapStateToProps)(SummaryQuestion)