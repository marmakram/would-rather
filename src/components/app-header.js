
import React from "react";
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { AUTH_USER } from '../constants';

class AppHeader extends React.Component {

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
        console.log(this.props.currUser);
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    {
                        this.props && this.props.currUser && (<Navbar.Brand >
                            {/* <img src={ require(this.props.currUser.avatarURL) } /> */}
                            <div className="img" onError={(e) => this.errorImg(e)} style={{
                                backgroundImage: 'url("' + this.props.currUser.avatarURL + '")'
                            }}>
                                {/* <img className="img" src='../images/img_avatar.png' /> */}
                            </div>
                        </Navbar.Brand>
                        )}
                    {this.props && this.props.currUser && (<Navbar.Brand>{this.props.currUser.name}</Navbar.Brand>)}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/'>Leaderboard</Nav.Link>
                            <Nav.Link as={Link} to="/add">New Question</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {this.props.currUser ? <Nav.Link onClick={() => this.logoutHandler()}>logout</Nav.Link> : <Nav.Link href='/login'>Login</Nav.Link>}
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