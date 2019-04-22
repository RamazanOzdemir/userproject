import React, { Component } from 'react';
import axios from "./layout/AxiosInstance";
import { connect } from 'react-redux';
import {userCheck} from './store/actions';

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
    check =(e) =>{
        e.preventDefault();
        const {userName,password,savedUsers} = this.state
        
        const isTrue = savedUsers.filter(user=>{
            
            
          return user.userName===userName&&user.password===password})
        
        if(isTrue.length){
            //dispatch({type:"USER_CHECKED",payload :isTrue})
            
            
        axios.post(`/loginUser/`,isTrue[0]).then(resp => this.props.userCheck(resp.data));
        }
        else alert("Please check your username and password!")
  
    }
    signin = (e) =>{
      e.preventDefault();
      const {userName,password} = this.state
       const newSavedUser ={userName,password}
        axios.post(`/savedUsers/`,newSavedUser)
        .then(resp=>this.setState({savedUsers:[...this.state.savedUsers,resp.data], sign:false}))
      
       
          
            //this.setState({sign:false})
  }
  openSigninPage = (e)=>{
    this.setState({sign:true})
  }
    componentDidMount = ()=>{
      
        axios.get("/savedUsers").then(resp=>{
            this.setState({savedUsers:resp.data})})
           
    
    }
  render() {
    const {userName,password,sign} = this.state
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
                                     
                      <button className="btn btn-danger btn-block" onClick ={this.check}>LOG IN</button>
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
          
   )
  }
}
const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  userCheck : user=> dispatch(userCheck(user)),


})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
 