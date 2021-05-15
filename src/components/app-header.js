
import React from "react";
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect, Link  } from 'react-router-dom';
import { AUTH_USER } from '../constants';

class AppHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currUser: props.currUser
        }
    }

    logoutHandler() {
        this.props.dispatch({
            type: AUTH_USER,
            userId: null
        })
        return <Redirect push to="/login" />
    }
    errorImg(e) {
        debugger
    }
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    {
                    this.state.currUser && (<Navbar.Brand >
                        {/* <img src={ require(this.state.currUser.avatarURL) } /> */}
                        <div className="img" onError={(e)=> this.errorImg(e)} style={{
                            backgroundImage: 'url("' + this.state.currUser.avatarURL + '")'
                        }}>
                            {/* <img className="img" src='../images/img_avatar.png' /> */}
                        </div>
                        </Navbar.Brand>
                        )}
                    {this.state.currUser && (<Navbar.Brand>{this.state.currUser.name}</Navbar.Brand>)}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/'>Leaderboard</Nav.Link>
                            <Nav.Link as={Link} to="/question/add">New Question</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {this.state.currUser ? <Nav.Link onClick={() => this.logoutHandler()}>logout</Nav.Link> : <Nav.Link href='/login'>Login</Nav.Link>}
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps({ users, authUserReducer }) {
    console.log("Comp app header, mapStateToProps,, ", { users, authUserReducer });
    let currUser = authUserReducer.userId ? users[authUserReducer.userId] : null
    return {
        authUser: authUserReducer,
        currUser
    }
}
export default connect(mapStateToProps)(AppHeader)