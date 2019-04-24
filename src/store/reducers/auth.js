import {LOGIN_SUCCESS,USER_CHECKED,LOGOUT_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loginUser : [0]
    
}

export default (state=initialState,action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        return {
            ...state,
            loginUser : action.loginUser
           
        } 
        case USER_CHECKED :
        return{
              ...state,
              loginUser:[action.login]
        }
        case LOGOUT_SUCCESS :
        return{
            ...state,
            loginUser : [0]
        }
        default :
        return state
    }

}