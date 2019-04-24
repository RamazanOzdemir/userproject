
import {SIDE} from "../actions/actionTypes"
const initialState = {
    isOpen : false
}

export default (state = initialState,action) => {
    switch (action.type){
       case SIDE :
       return  {
            ...state,
            isOpen : !state.isOpen
       }
       default :
       return state
    } 
}