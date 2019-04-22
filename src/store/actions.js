import axios from "../layout/AxiosInstance";


export const getUsers = () => dispatch => {
    axios.get('/users')
        .then(response=> dispatch({
            type:'GET_USERS',
            users:response.data,
            status:response.status
        }))
     
}
export const getLogin = () => dispatch => {
    axios.get('/loginUser')
        .then(response=> dispatch({
            type:'LOGIN_USERS',
            loginUser : response.data,
            
        }))
     
}
export const deleteUser = (id) => dispatch => {
        dispatch({
            type:'DELETE_USER',
            id
        })
}
export const deleteTrash = (id) => dispatch => {
    dispatch({
        type:'DELETE_TRASH',
        id
    })
}
export const reloadUser = (id) => dispatch => {
    dispatch({
        type:'RELOAD_USER',
        id
    })
}
export const addUser = (newUser) => dispatch => {
    dispatch({
        type:'ADD_USER',
        newUser
    })
}
export const updatedUser = (payload) => dispatch => {
   
    dispatch({
        type:'UPDATE_USER',
        payload 
    })
}
export const side = ()=> dispatch => {
    dispatch({
        type:'SIDE'
    
    })
}
export const userCheck = login=> dispatch => {
    dispatch({
        type:'USER_CHECKED',
        login
    })
}