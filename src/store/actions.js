import axios from 'axios';

const url = "http://localhost:3004";


export const getUsers = () => dispatch => {
    axios.get(url +'/users')
        .then(response=> dispatch({
            type:'GET_USERS',
            users:response.data
        }))
}