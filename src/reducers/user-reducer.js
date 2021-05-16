import {RECEIVE_DATA, ANSWER_QUESTION, ADD_USER_QUESTION} from '../constants';

export default function users(state = {}, action){
  
    switch(action.type){
      case ANSWER_QUESTION:
          state[action.userId].answers ={...state[action.userId].answers, ...action.answer}
          return state;
      case RECEIVE_DATA:
        return {
          ...state,
          ...action.users
        };
        case ADD_USER_QUESTION:
          state[action.userId].questions.push(action.questionId)
          return state;
      default:
        return state
    }
  }