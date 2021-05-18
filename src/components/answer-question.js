import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ANSWER_QUESTION } from '../constants'

class AnswerQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionId: props.questionId
        }
    }

    onChangeValue(selectedOptions) {
        this.setState({
            opt: selectedOptions
        });
    }

    handleAnser() {
        let op = this.state.opt;
        let ans = {};
        ans[this.props.question.id] = 'optionOne'
        if (op === "1") {
            this.props.question.optionOne.votes.push(this.props.userId)
            ans[this.props.question.id] = 'optionOne'
        }
        if (op === "2") {
            this.props.question.optionTwo.votes.push(this.props.userId)
            ans[this.props.question.id] = 'optionTwo'
        }
        let q = { ...this.props.question };

        this.props.dispatch({
            type: ANSWER_QUESTION,
            question: q,
            Id: this.state.questionId,
            answer: ans,
            userId: this.props.userId
        })
        this.props.history.push({ pathname: "/" })
    }

    componentDidMount() {
        let questionId = this.props.questionId;
        if (this.props.history !== undefined &&
        (this.props.question === undefined || questionId === null || questionId === undefined)) {
            this.props.history.push({ pathname: "/404" })
        }
    }

    render() {
        const quest = this.props.question;
        if (quest === undefined) return <div></div>;
        return (<div className="">
            <div>
                <div className="row">

                    <div className="col-md-2">
                        <div className="img" style={{
                            margin: 15,
                            backgroundImage: 'url("' + this.props.users[quest.author].avatarURL + '")'
                        }}>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div><span className="name">{this.props.users[quest.author].name + " "}</span>
                     asks would you rather ..  </div>
                        <div >
                            <input type="radio" value="1" onChange={(e) => this.onChangeValue(e.target.value)}
                                name="options" /> {quest.optionOne.text}
                        </div>
                        <div>
                            <input type="radio" value="2" onChange={(e) => this.onChangeValue(e.target.value)}
                                name="options" /> {quest.optionTwo.text}
                        </div>
                        <button className="btnMax btn btn-primary" disabled={!this.state.opt}
                            onClick={(e) => this.handleAnser()}>Answer</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state, props) {
    let { questionsReducer, authUserReducer, users } = state;
    let questionId = props.questionId//.match.params['question_id']//location.state.questionId;
    const questions = questionsReducer;

    const { userId } = authUserReducer;

    return {
        userId,
        users,
        questionId,
        question: questions[questionId]
    }
}
export default withRouter(connect(mapStateToProps)(AnswerQuestion))