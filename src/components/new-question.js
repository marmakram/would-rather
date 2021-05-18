import React from 'react';
import { connect } from 'react-redux';
import { generateUID } from '../_DATA';
import { ADD_USER_QUESTION } from '../constants'

class AddQuestion extends React.Component {

    handleAnser() {
        let o = this.state.op1;
        let t = this.state.op2;
        let q = {};
        let id = generateUID();
        q[id] = {
            id: id,
            author: this.props.userId,
            optionOne: {
                votes: [],
                text: o,
            },
            optionTwo: {
                votes: [],
                text: t
            }
        }
        this.props.dispatch({
            type: ADD_USER_QUESTION,
            question: q,
            questionId: id,
            userId: this.props.userId
        })
        this.props.history.push({ pathname: "/" })
    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-2">
                    <div className="img" style={{
                        backgroundImage: 'url("' + this.props.user.avatarURL + '")'
                    }}>
                    </div>
                </div>
                <div className="col-md-9">
                    <div><span className="name">{this.props.user.name + " "}</span>
                     asks would you rather ..  </div>
                    <div style={{ textAlign: 'start' }}>
                        <p>
                            <input type="text" className="textInput form-control" onChange={(c) => this.setState({ op1: c.target.value })}
                                placeholder="option 1" />
                        </p>
                    </div>
                    <div style={{ textAlign: 'start' }}>
                        <p>
                            <input type="text" className="textInput form-control" onChange={(c) => this.setState({ op2: c.target.value })}
                                placeholder="option 2" />
                        </p>
                    </div>
                    <button className="btnMax btn btn-primary"
                        onClick={(e) => this.handleAnser()}>Add</button>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps({ authUserReducer, users }) {
    const { userId } = authUserReducer;

    return {
        userId,
        user: users[userId]
    }
}
export default connect(mapStateToProps)(AddQuestion)