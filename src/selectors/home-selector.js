
import { createSelector } from 'reselect'

const questionsFilter = (state) => state.questionsReducer
const auth = (state) => state.authUserReducer
const usersFilter = (state) => state.users

const homeSelector = createSelector(
    [ questionsFilter, usersFilter, auth ],
    (questions, users, user) => {
        let userId = user.userId
        let unanswered = Object.keys(questions).filter(a => {
            if (questions[a].optionOne.votes.filter(v1 => v1 === userId).length > 0)
                return false;
            if (questions[a].optionTwo.votes.filter(v1 => v1 === userId).length > 0)
                return false;
            return true;
        }).map(a => questions[a])
        .sort(function(a, b){return b.timestamp-a.timestamp});
    
        let answered = Object.keys(questions).filter(a => {
            if (unanswered.filter(x => x.id === a).length > 0)
                return false;
            return true;
        }).map(a => questions[a])
        .sort(function(a, b){return b.timestamp-a.timestamp});

        return {
            answered,
            unanswered,
            users
        }
    }
  )

  export default function mapStateWithSelectToProps(state) {
    return homeSelector(state)
  }