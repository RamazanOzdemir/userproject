import {SAVED_SUCCESS,SAVED_USERS} from "../actions/actionTypes";

const initialState = {
    savedUsers : [0]
    
}

export default (state=initialState,action) => {
    switch(action.type){
        case SAVED_SUCCESS:
        return {
            ...state,
            savedUsers : [...state.savedUsers,action.saved]
           
        } 
        case SAVED_USERS :
        return {
            ...state,
            savedUsers : action.savedUsers
        }
        default :
        return state
    }

}