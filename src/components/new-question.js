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
            questionId: id
        })
        this.props.history.push({ pathname: "/" })
    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-10">
                    <div><span className="name">{this.props.user.name + " "}</span>
                     asks would you rather ..  </div>
                    <div style={{ textAlign: 'start' }}>
                        <p>
                            <input type="text" className="form-control" onChange={(c) => this.setState({op1: c.target.value})}
                             placeholder="option 1" />
                        </p>
                    </div>
                    <div style={{ textAlign: 'start' }}>
                        <p>
                            <input type="text" className="form-control" onChange={(c) => this.setState({op2: c.target.value})}
                             placeholder="option 2" />
                        </p>
                    </div>
                    <button style={{ maxWidth: 200 }} className="btn btn-primary"
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