import axios from "../../layout/AxiosInstance";
import axi from "axios";
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CHECK_REQUEST,CHECK_SUCCESS,CHECK_FAIL, LOGOUT_SUCCESS} from "./actionTypes"

const url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBB8VV6P3qlc2LuczF_-VQtJpgAv_C3lus"
//const urlAuth ='https://reactapp-47e67.firebaseio.com/LoginUsers.json'

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

const checkRequest = ()=>({
    type : CHECK_REQUEST
})

const checkSuccess = loginUser=>({
    type : CHECK_SUCCESS,
    registered : loginUser["registered"],
    localId : loginUser["localId"],
    idToken : loginUser["idToken"],
    refreshToken : loginUser["refreshToken"],
    expiresIn : loginUser["expiresIn"]
})

const checkFail = ()=> ({
    type : CHECK_FAIL
})
export const userCheck =(email,password) => dispatch => {
   const checked = {email:email,password:password,returnSecureToken:true}
    console.log(checked)
    dispatch(checkRequest())
    axi.post(url,checked)
    .then(resp => dispatch(checkSuccess(resp.data)))
    .catch(checkFail)
    
    //axios.post(`/loginUser/`,checked)
    //.then(resp =>dispatch({
    //    type: USER_CHECKED,
    //    login : resp.data
    //}));

    
}

export const logOut = id => dispatch => {
  //  axios.delete(`loginUser/${id}`)
   // .then(resp => 
        dispatch({
        type : LOGOUT_SUCCESS
    })
   // )
}