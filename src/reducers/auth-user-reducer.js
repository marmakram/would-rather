
import {AUTH_USER} from '../constants';

export default function authUserReducer(state= {}, action){
    switch(action.type){
        case AUTH_USER:
        return {
          ...state,
          userId: action.userId
        };

      default:
        return state
    }
}