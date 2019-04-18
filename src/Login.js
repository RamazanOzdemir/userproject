import React, { Component } from 'react'
import UserConsumer from './context';
import axios from "axios";

class Login extends Component {
    state = {
        sign : false,
        savedUsers : [],
        userName : "",
        password :"",
        
    }
    changeInput = (e)=>{
        this.setState({
           [ e.target.name] : e.target.value
        })
    }
    check = async (dispatch  ,e) =>{
        e.preventDefault();
        const {userName,password,savedUsers} = this.state
        
        const isTrue = savedUsers.filter(user=>{
            
            
          return user.userName===userName&&user.password===password})
        
        if(isTrue.length){
            dispatch({type:"USER_CHECKED",payload :isTrue})
           
            await axios.post(`http://localhost:3004/loginUser/`,isTrue[0]);
        }
        else alert("Please check your username and password!")
  
    }
    signin = async (e) =>{
      e.preventDefault();
      const {userName,password} = this.state
       const newSavedUser ={userName,password}
          await axios.post(`http://localhost:3004/savedUsers/`,newSavedUser);
      
          this.setState({sign:false})
          axios.get("http://localhost:3004/savedUsers").then(resp=>{
            this.setState({savedUsers:resp.data})})
  }
  openSigninPage = (e)=>{
    this.setState({sign:true})
  }
    componentDidMount = ()=>{
      
        axios.get("http://localhost:3004/savedUsers").then(resp=>{
            this.setState({savedUsers:resp.data})})
    
    }
  render() {
    return (
      <UserConsumer>
         { value =>{
             const {userName,password,sign} = this.state
             const {dispatch}=value
             
            
          return(
                !sign?
                    <div className=" border border-danger rounded col-sm-6 col-10 my-5">
                        <form onSubmit={this.addUser} className="my-2 mx-2" >
                          <div className="form-group">
                            <label htmlFor="userName">User Name:</label>
                                <input
                                type = "text"
                                name = "userName"
                                id = "idName"
                                placeholder = "Enter UserName"
                                className = "form-control"
                                value = {userName}
                                onChange ={this.changeInput}      
                                />                        
                           </div>
                           <div className="form-group">
                            <label htmlFor="password">Password :</label>
                                <input
                                type = "text"
                                name = "password"
                                id = "idPassword"
                                placeholder = "Enter Password"
                                className = "form-control"
                                value = {password}
                                onChange ={this.changeInput}      
                                />                        
                           </div>                            
                                           
                            <button className="btn btn-danger btn-block" onClick ={this.check.bind(this,dispatch)}>LOG IN</button>
                            <button className="btn btn-info btn-block" onClick ={this.openSigninPage}>SIGN IN</button>
                        </form>
                    </div>
              : 
              <div className=" border border-danger rounded col-sm-6 col-10 my-5">
                        <form onSubmit={this.addUser} className="my-2 mx-2" >
                          <div className="form-group">
                            <label htmlFor="userName">User Name:</label>
                                <input
                                type = "text"
                                name = "userName"
                                id = "idName"
                                placeholder = "Enter UserName"
                                className = "form-control"
                                value = {userName}
                                onChange ={this.changeInput}      
                                />                        
                           </div>
                           <div className="form-group">
                            <label htmlFor="password">Password :</label>
                                <input
                                type = "text"
                                name = "password"
                                id = "idPassword"
                                placeholder = "Enter Password"
                                className = "form-control"
                                value = {password}
                                onChange ={this.changeInput}      
                                />                        
                           </div>                            
                                           
                            <button className="btn btn-info btn-block" onClick ={this.signin}>SIGN IN</button>
                        </form>
                    </div>
                
         )}}
      </UserConsumer>
        
      
    )
  }
}
export default Login;