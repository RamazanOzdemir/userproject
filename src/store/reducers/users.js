//action type ları string yerine actionTypes içinden import edeceğiz.

import { USERS_SUCCESS } from "../actions/actionTypes";

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
        case "DELETE_USER":    
        return{
         ...state,
         list : state.list.map(user=>user.id===action.id?{...user,isTrash:true}: user)
        }
        case "RELOAD_USER" :
        return {
          ...state,
          list : state.list.map(user=>user.id===action.id? {...user,isTrash:false} : user)
        }
        case "UPDATE_USER":
        return {
          ...state,
          list : state.list.map(user =>user.id === action.payload.id?action.payload : user)
        }
        case "ADD_USER":
        return  {
          ...state,
          list : [...state.list,action.newUser]}
       default :
       return state
    } 
}