import React from 'react';
import { connect } from 'react-redux';

class Leaderboard extends React.Component {

    render() {
        let List = this.props.users;
        return (
            <div>
            <h1>Leaderboard</h1>
                {List !== null &&
                    Object.keys(List).map((user) => {
                        return (<div key={user} >
                            <div className="d-flex justify-content-center itemList">
                                <div className="col-md-2">
                                    <div className="img" onError={(e) => this.errorImg(e)} style={{
                                        backgroundImage: 'url("' + List[user].avatarURL + '")'
                                    }}>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div>
                                        <div><span className="name">{List[user].name}</span></div>
                                        <div> Asked {List[user].askedNo} questions</div>
                                        <div> Answered {List[user].anweredNo} questions</div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })

                }
            </div>
        );
    }
}
function mapStateToProps({ users }) {

    Object.keys(users).forEach(user => {
        users[user].askedNo = users[user].questions.length;
        users[user].anweredNo = Object.keys(users[user].answers).length
    });
    users = Object.keys(users).map(a => users[a]).sort(function(a, b){return (b.anweredNo + b.askedNo)-(a.anweredNo + a.askedNo)});
    return {
        users
    }
}
export default connect(mapStateToProps)(Leaderboard)