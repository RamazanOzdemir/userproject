import axios from "../../layout/AxiosInstance";
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,USER_CHECKED, LOGOUT_SUCCESS} from "./actionTypes"
const loginRequest = ()=>({
    type : LOGIN_REQUEST
})

const loginSuccess = loginUser=>({
    type : LOGIN_SUCCESS,
    loginUser
})

const loginFail = ()=> ({
    type : LOGIN_FAIL
})
export const getLogin = () => dispatch => {
    dispatch(loginRequest())
    axios.get('/loginUser')
    .then(response=> dispatch(loginSuccess(response.data)))
    .catch(error => dispatch(loginFail()))   
}

export const userCheck = checked => dispatch => {
    axios.post(`/loginUser/`,checked)
    .then(resp =>dispatch({
        type: USER_CHECKED,
        login : resp.data
    }));

    
}

export const logOut = id => dispatch => {
    axios.delete(`loginUser/${id}`)
    .then(resp => dispatch({
        type : LOGOUT_SUCCESS
    }))
}