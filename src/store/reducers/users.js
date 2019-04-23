//action type ları string yerine actionTypes içinden import edeceğiz.

import { USERS_SUCCESS,DELETE_SUCCESS ,TRASH_SUCCESS,RELOAD_SUCCESS,ADD_SUCCESS,UPDATE_SUCCESS} from "../actions/actionTypes";

const initialState = {
    list : [],
    isOpen : false
}

export default (state = initialState,action) => {
    switch (action.type){

        case USERS_SUCCESS: //reducer lara verileri sadece success durumunda gönderiyoruz. fail veya request bu kısımda bizi ilgilendirmiyor
        return {
            ...state,
            list : action.users,
            status:action.status,
           
        }     
        case DELETE_SUCCESS:    
        return{
         ...state,
         list : state.list.map(user=>user.id===action.id?{...user,isTrash:true}: user)
        }
        case RELOAD_SUCCESS :
        return {
          ...state,
          list : state.list.map(user=>user.id===action.id? {...user,isTrash:false} : user)
        }
        case UPDATE_SUCCESS:
        return {
          ...state,
          list : state.list.map(user =>user.id === action.newUser.id?action.newUser : user)
        }
        case ADD_SUCCESS:
        return {
          ...state,
          list : [...state.list,action.newUser]}
        case TRASH_SUCCESS : 
        return {
          ...state,
          list : state.list.filter(user =>user.id !== action.id)
        }
       default :
       return state
    } 
}