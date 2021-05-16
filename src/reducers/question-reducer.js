import {RECEIVE_DATA, ADD_USER_QUESTION, ANSWER_QUESTION} from '../constants';

export default function questionsReducer(state= {}, action){
    switch(action.type){
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
        let timestamp = Math.max(...Object.keys(state).map(x => state[x].timestamp)) +1;
        action.question[action.questionId].timestamp = timestamp;
        return {...state, ...action.question}
      default:
        return state
    }
  }