import axios from "../../layout/AxiosInstance";
import { USERS_REQUEST, USERS_SUCCESS, USERS_FAIL,
    DELETE_REQUEST,DELETE_SUCCESS,DELETE_FAIL ,
    TRASH_REQUEST,TRASH_SUCCESS,TRASH_FAIL,
    RELOAD_REQUEST,RELOAD_SUCCESS,RELOAD_FAIL,
    ADD_REQUEST,ADD_SUCCESS,ADD_FAIL,
    UPDATE_REQUEST,UPDATE_SUCCESS,UPDATE_FAIL} from "./actionTypes";

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

// DELETE USER İÇİN 
const deleteRequest = () => ({
    type:DELETE_REQUEST
})

const deleteSuccess = (id) => ({
    type: DELETE_SUCCESS,
    id
})

const deleteFail = () => ({
    type: DELETE_FAIL
})

export const deleteUser = (id) => dispatch => {
    dispatch(deleteRequest())
    axios.patch(`users/${id}`,{isTrash:true})
    .then(resp=>dispatch(deleteSuccess(id)))
    .catch(error=>dispatch(deleteFail()))

}
/// DELETE TRASH USER İÇİN
const deleteTrashRequest = () => ({
    type:TRASH_REQUEST
})

const deleteTrashSuccess = (id) => ({
    type: TRASH_SUCCESS,
    id
})

const deleteTrashFail = () => ({
    type: TRASH_FAIL
})
export const deleteTrashUser = (id) => dispatch => {
    dispatch(deleteTrashRequest())
    axios.delete(`users/${id}`)
    .then(resp=>dispatch(deleteTrashSuccess(id)))
    .catch(error => dispatch(deleteTrashFail()))
  

}
// USER RELOAD

const reloadRequest = () => ({
    type: RELOAD_REQUEST
})

const reloadSuccess = (id) => ({
    type: RELOAD_SUCCESS,
    id
})

const reloadFail = () => ({
    type: RELOAD_FAIL
})

export const reloadUser = (id) => dispatch => {
    dispatch(reloadRequest())
    axios.patch(`users/${id}`,{isTrash:false})
    .then(resp => dispatch(reloadSuccess(id)))
    .catch(error => dispatch(reloadFail()))
 
}

// ADD USER
const addRequest = () => ({
    type: ADD_REQUEST
})

const addSuccess = (newUser) => ({
    type: ADD_SUCCESS,
    newUser
})

const addFail = () => ({
    type: ADD_FAIL
})
export const addUser = (newUser) => dispatch => {
    dispatch(addRequest())
    axios.post("/users",newUser)
    .then(resp =>dispatch(addSuccess(resp.data )))
    .catch(error=>dispatch(addFail()))

}

//Update User
const updateRequest = () => ({
    type: UPDATE_REQUEST
})

const updateSuccess = (newUser) => ({
    type: UPDATE_SUCCESS,
    newUser
})

const updateFail = () => ({
    type: UPDATE_FAIL
})

export const updatedUser = (newUser) => dispatch => {
    dispatch(updateRequest())
    axios.patch(`/users/${newUser.id}`,newUser)
    .then(resp =>dispatch(updateSuccess(resp.data)))
    .catch(errror => dispatch(updateFail()))

}