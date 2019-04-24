import React, { Component } from 'react';
import { connect } from 'react-redux';
import {userCheck,getSavedUser,setSavedUser} from './store/actions';

class Login extends Component {
  state = {
        sign : false,
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
    const {userName,password} = this.state
    const {savedUsers} = this.props
    const isTrue = savedUsers.filter(user=>user.userName===userName&&user.password===password)

    if(isTrue.length)
      this.props.userCheck(isTrue[0])
    else alert("Please check your username and password!")
  
  }

  signin = (e) =>{
      e.preventDefault();
      const {userName,password} = this.state
       const newSavedUser ={userName,password}
      this.props.setSavedUser(newSavedUser);
      this.setState(()=>({sign:false})) 
  }      

  openSigninPage = (e)=>{
    this.setState({sign:true})
  }

  componentDidMount = ()=>{
      this.props.getSavedUser();       
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
  savedUsers : state.saved.savedUsers
})

const mapDispatchToProps = dispatch => ({
  userCheck : user=> dispatch(userCheck(user)),
  getSavedUser : () => dispatch(getSavedUser()),
  setSavedUser : user => dispatch(setSavedUser(user)) 


})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
 