import {RECEIVE_DATA, ADD_USER_QUESTION, ANSWER_QUESTION} from '../constants';

export default function questionsReducer(state= {}, action){
    switch(action.type){
      /* case USER_ANSWER_QUESTION:
        return {
          ...state,
          [action.auth]: {
            ...state[action.auth],
            answers: {
              ...state[action.auth].answers,
              [action.qid]: action.option
            }
          }
        };
       */
        case ANSWER_QUESTION:
          state[action.Id] = action.question
          return {
            ...state
          };
      case RECEIVE_DATA:
        return {
          ...state,
          ...action.questions
        };
      case ADD_USER_QUESTION :
        debugger
        let timestamp = Math.max(...Object.keys(state).map(x => state[x].timestamp)) +1;
        action.question[action.questionId].timestamp = timestamp;
        return {...state, ...action.question}
      default:
        return state
    }
  }