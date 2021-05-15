import React from 'react';
import { withRouter } from 'react-router-dom';

class QuestionList extends React.Component {

    constructor(props) {
        super(props);;
    }
    render() {
        let List = this.props.questions;
        return (
            <div>
                {List !== null &&
                    List.map((quest, i) => {
                        return (<div key={quest.id} >
                            <div className="d-flex justify-content-center itemList">
                                <div className="col-md-2">
                                    <div className="img" onError={(e) => this.errorImg(e)} style={{
                                        backgroundImage: 'url("' + this.props.users[quest.author].avatarURL + '")'
                                    }}>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div>
                                        <div><span className="name">{this.props.users[quest.author].name}</span> asks would you rather </div>
                                        <ul>
                                            <li><p style={{ color: 'gray' }}>{quest.optionOne.text}</p></li>
                                            <li><p style={{ color: 'gray' }}>{quest.optionTwo.text}</p></li>
                                        </ul>
                                        <button style={{height:25, padding: 0}} onClick={(e) => this.props.handleView(this.props, quest.id)}>View Question</button>
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
export default withRouter(QuestionList)