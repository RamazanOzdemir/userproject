const initialState = {
    list : [],
    loginUser : [0],
    status :0,
    isOpen : false
}

export default (state = initialState,action) => {
    switch (action.type){
        case 'LOGIN_USERS':
        return {
            ...state,
            loginUser : action.loginUser
           
        }
        case 'GET_USERS':
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
        case "DELETE_TRASH" : 
        return{
          ...state,
          list : state.list.filter(user =>user.id !== action.id)
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
       case "SIDE":
       return  {
            ...state,
            isOpen : !state.isOpen
       }
       case "USER_CHECKED" :
       return{
             ...state,
             loginUser:[action.login]
       }
       default :
       return state
    } 
}