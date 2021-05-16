import React from 'react'
import { connect } from 'react-redux';

import { AUTH_USER } from '../constants'

class Login extends React.Component {
    state = {
        userId: ''
    }

    handleUser(params) {
        this.setState({
            userId: params
        });
    }

    handleSubmit(params) {
        this.props.dispatch({
            type: AUTH_USER,
            userId: this.state.userId
        });
        if (this.props.location !== undefined && this.props.location.state.from !== undefined) {
            let p = this.props.location.state.from;
            this.props.history.push({ pathname: p })
        }
        else {
            this.props.history.push({ pathname: "/" })
        }
    }

    componentDidMount() {
        let loc = this.props.location;
        console.log("Location ", loc);
    }
    render() {
        const { users } = this.props;
        return (
            <div className="login form">
                <div className="container" style={{ width: '25%', }}>
                    <label className="h3 mb-3 font-weight-normal">Select User</label>
                    <select className="inputLog" value={this.state.userId} onChange={(event) => this.handleUser(event.target.value)} >
                        <option value="" disabled>Please select</option>
                        {users !== null && (
                            Object.keys(users).map(user =>
                                <option key={user} value={user}>
                                    {users[user].name}
                                </option>)
                        )
                        }
                    </select>
                    <button disabled={!this.state.userId || this.state.userId === ''} onClick={() => this.handleSubmit()}>Login</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    console.log("Comp login, mapStateToProps,, ", { users });
    return {
        users
    }
}

export default connect(mapStateToProps, null)(Login)

