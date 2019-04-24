import axios from "../../layout/AxiosInstance";
import {SAVED_SUCCESS,SAVED_USERS} from "./actionTypes"

export const setSavedUser = newSaved=> dispatch =>{
    axios.post(`/savedUsers/`,newSaved)
    .then(resp => dispatch({
        type : SAVED_SUCCESS,
        saved : resp.data
    }))
}

export const getSavedUser = () => dispatch =>{
    axios.get(`/savedUsers/`)
    .then( resp => dispatch ({
        type : SAVED_USERS,
        savedUsers : resp.data
    }))
}