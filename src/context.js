import React, { Component } from 'react';
import axios from "./layout/AxiosInstance";

const reducer = (state,action) => {
    switch (action.type){
        case "DELETE_USER":
            
          return{
           ...state,
           users : state.users.map(user=>user.id===action.payload? {...user,isTrash:true} : user)
          }
        case "RELOAD_USER" :
        return {
          ...state,
          users : state.users.map(user=>user.id===action.payload? {...user,isTrash:false} : user)
        }
        case "DELETE_TRASH" : 
          return{
            ...state,
            users : state.users.filter(user =>user.id !== action.payload)
          }
        case "ADD_USER":
          
          return  {
            ...state,
            users : [...state.users,action.payload]}
        case "UPDATE_USER":
          return {
            ...state,
            users : state.users.map(user =>user.id === action.payload.id?action.payload : user)
          }
       case "USER_CHECKED" :
          return{
           ...state,loginUser:action.payload
        }                       
            
        default :
          return state

    }
    
}

const UserContext = React.createContext();
//Provider Cunsumer
export  class UserProvider extends Component {
    state = {
        users : [  ],

        dispatch : action =>{
            this.setState(state=>reducer(state,action))
        },
        isOpen : "",
        side : ()=>{
          this.setState({isOpen:!this.state.isOpen})
        },
        status : 0,
    
        loginUser : [1],
        
      }
      //Eğer axios u kullanacaksan async/await yapısını kullanman gerekiyor yoksa promis dönüyor ve çalışmıyor.
  componentDidMount =  ()=>{
    

     axios.get("/users").then(response=>{
      this.setState({users : response.data , isOpen : false ,status:response.status });
      
     }).catch(this.setState({status:0 }));

     axios.get("http://localhost:3004/loginUser").then(resp=>{
      this.setState({loginUser:resp.data}

        )
  })
  
    
    
      
   //fetch("http://localhost:3004/users").then(res=>res.json()).then(resp=>this.setState({users : [...resp]}))
        
        
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
          {this.props.children }
      </UserContext.Provider>
        
      
    )
  }
}
const UserConsumer =UserContext.Consumer;

export default UserConsumer;


