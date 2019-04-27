import axios from "../../layout/AxiosInstance";
import {SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,SAVED_USERS} from "./actionTypes"

const url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBB8VV6P3qlc2LuczF_-VQtJpgAv_C3lus";

const signupRequest = ()=>({
    type : SIGNUP_REQUEST
})

const signupSuccess = saved=>({
    type : SIGNUP_SUCCESS,
    saved 
})

const signupFail = ()=> ({
    type : SIGNUP_FAIL
})

export const setSavedUser = newSaved=> dispatch =>{
    dispatch(signupRequest())
    console.log(newSaved)
    axios.post(url,newSaved)
    .then(resp => dispatch(signupSuccess(resp.data)))
    .catch(signupFail())
}

export const getSavedUser = () => dispatch =>{
    axios.get(`/savedUsers/`)
    .then( resp => dispatch ({
        type : SAVED_USERS,
        savedUsers : resp.data
    }))
}