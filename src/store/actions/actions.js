//actions.js kalkacak. actions klasörü içinde parçalara ayrılacak,
// usersActions, authActions gibi...

import axios from "../../layout/AxiosInstance";



export const getLogin = () => dispatch => {
    axios.get('/loginUser')
        .then(response=> dispatch({
            type:'LOGIN_USERS',
            loginUser : response.data,
            
        }))
     
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