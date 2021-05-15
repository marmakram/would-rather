import React from 'react';
import { connect } from 'react-redux';
import { ANSWER_QUESTION } from '../constants'

class AnswerQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionId: props.location.state.questionId
        }
    }

    onChangeValue(selectedOptions) {
        this.setState({
            opt: selectedOptions
        });
    }

    handleAnser() {
        let op = this.state.opt;
        if (op === "1")
            this.props.question.optionOne.votes.push(this.props.userId)
        if (op === "2")
            this.props.question.optionTwo.votes.push(this.props.userId)

        let q = { ...this.props.question };

        this.props.dispatch({
            type: ANSWER_QUESTION,
            question: q,
            Id: this.state.questionId
        })
        this.props.history.push({ pathname: "/" })
    }

    render() {
        const quest = this.props.question;
        console.log("quest,, ", quest);
        return (<div className="">
            <div>
                <div className="row">

                    <div className="col-md-2">
                        <div className="img" style={{margin: 15,
                            backgroundImage: 'url("' + this.props.users[quest.author].avatarURL + '")'
                        }}>
                        </div>
                    </div>
                    <div className="col-md-10">
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
                        <button style={{ maxWidth: 200 }} className="btn btn-primary" disabled={!this.state.opt}
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
    let questionId = props.location.state.questionId;
    const questions = questionsReducer;

    const { userId } = authUserReducer;
    console.log("quest,, ", questionId, questions[questionId]);

    return {
        userId,
        users,
        question: questions[questionId]
    }
}
export default connect(mapStateToProps)(AnswerQuestion)