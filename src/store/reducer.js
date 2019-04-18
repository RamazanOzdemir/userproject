const initialState = {
    list:[]
}
export default (state = initialState,action) => {
    switch (action.type){
        case 'GET_USERS':
        return {
            ...state,
            list:action.users
        }   
        default :
          return state
    } 
}