import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

class SummaryQuestion extends React.Component {

    handleAnser() {
        this.props.history.push({ pathname: "/" })
    }
    componentDidMount() {
        let questionId = this.props.questionId//match.params.question_id;
        if (this.props.questions === undefined || questionId === null || questionId === undefined) {
            this.props.history.push({ pathname: "/404" })
        }
        else {
            let selected = this.props.questions[questionId];
            if (selected === null || selected === undefined) {
                this.props.history.push({ pathname: "/404" })
            }
        }
    }

    render() {
        const quest = this.props.question;
        if (quest === undefined) return <div></div>;
        const op1 = !quest ? 0 : quest.optionOne.votes.length;
        const op2 = !quest ? 0 : quest.optionTwo.votes.length;
        const tot = (op1 + op2);
        const selectedSt = quest.optionOne.votes.filter(a => a === this.props.authUser).length > 0;
        let opRatio1 = Math.round((op1 / tot) * 100);
        let opRatio2 = Math.round((op2 / tot) * 100);
        return quest && (<div className="container">
            <div className="row">
                <div className="col-md-10">
                    <div><span className="name">{this.props.users[quest.author].name + " "}</span>
                     asks would you rather ..  </div>
                    <div style={{ textAlign: 'start', margin: 20 }}>
                        <ProgressBar now={opRatio1} label={`${opRatio1}%`} />
                        <div>{quest.optionOne.text}</div>
                        <div>{quest.optionOne.votes.length} out of {tot}</div>
                    </div>
                    <div style={{ textAlign: 'start', margin: 20 }}>
                        <ProgressBar now={opRatio2} label={`${opRatio2}%`} />
                        <div>{quest.optionTwo.text}</div>
                        <div>{quest.optionTwo.votes.length} out of {tot}</div>
                    </div>
                    <div> And you selected : </div>
                    <div>
                        {selectedSt ?
                            (<div style={{ fontWeight: 'bold' }}>{quest.optionOne.text}</div>) :
                            (<div style={{ fontWeight: 'bold' }}>{quest.optionTwo.text}</div>)
                        }
                    </div>
                    <button className="btnMax btn btn-primary"
                        onClick={(e) => this.handleAnser()}>Close</button>
                </div>
            </div>
        </div >
        );

    }
}

function mapStateToProps(state, props) {
    let { questionsReducer, authUserReducer, users } = state;
    let questionId = props.questionId//match.params.question_id;
    const questions = questionsReducer;

    return {
        authUser: authUserReducer,
        users,
        questions,
        question: questionId ? questions[questionId] : null
    }
}
export default withRouter(connect(mapStateToProps)(SummaryQuestion))