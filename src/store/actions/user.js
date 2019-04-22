import axios from "../../layout/AxiosInstance";
import { USERS_REQUEST, USERS_SUCCESS, USERS_FAIL } from "./actionTypes";

//her bir request için standart _Request, _Success, _Fail fonksiyonlarımız ve action type larımıız var


const usersRequest = () => ({
    type:USERS_REQUEST
})

const usersSuccess = (users) => ({
    type: USERS_SUCCESS,
    users
})

const usersFail = () => ({
    type: USERS_FAIL
})

export const getUsers = () => dispatch => {
    dispatch(usersRequest()) // böylece loading['USERS'] true oldu
    axios.get('/users')
        .then(response=> dispatch(usersSuccess(response.data))) //loading['USERS'] false oldu
        .catch(error=> dispatch(usersFail()))  //loading['USERS'] false oldu
     
}


/////////////////////// buradan sonrası da standart yapıda olmalı

export const deleteUser = (id) => dispatch => {
    dispatch({
        type:'DELETE_USER',
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