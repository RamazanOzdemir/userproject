//bu toplu reducer komple kalkacak. reducer klasörü içinde parça parça oluşturulacak.
// authReducer.js, usersReducer.js, uiReducer.js gibi...

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
        case "DELETE_TRASH" : 
        return{
          ...state,
          list : state.list.filter(user =>user.id !== action.id)
        }
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