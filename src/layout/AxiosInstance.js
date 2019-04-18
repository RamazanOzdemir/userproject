import axios from "axios"

   const instance = axios.create(
     {baseURL:"http://localhost:3004/",
     timeout:20000,
     headers:{"Content-Type":"application/json","Accept":"application/json"}})
 export default instance;