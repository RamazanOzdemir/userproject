import React, { Component } from 'react'
// import posed from "react-pose"; animation için yüklenmişti
import {connect} from "react-redux"
import {addUser} from "../store/actions"
//var uniqid = require('uniqid');
/* const Animation = posed.div({
    visible : {
        opacity : 1,
        applyAtStart :{
            display : "block"
        }
    },
    hidden : {
        opacity : 0,
        applyAtEnd : {
            display : "none"
        }

       ***** ANİMASYON İÇİN*****
    }
}); */
class AddUser extends Component {
    state = {
        visible : false,
        name : "",
        department :"",
        salary : ""
    }
 /*changeVisibility = (e)=>{
        this.setState({
            visible : !this.state.visible
        });
    }*/
 changeInput = (e)=>{
     this.setState({
        [ e.target.name] : e.target.value
     })
 }
 // formlarda eklenen buton default olarak submit yapıp sayfayı yeniliyor.
 // Bunu e.preventDefault metodu ile engelliyebiliriz.
 addUser =  (e) =>{
     e.preventDefault();
     const {loginUser,addLoading} = this.props;
     const {name,department,salary} = this.state
     const newUser ={
        loginId :loginUser[0].id,
        name : name,
        department : department,
        salary : salary,
        creationDate : Date.now(),
        updatedDate : 0,
        isTrash : false
     }
     if(!addLoading)
    this.props.addUser(newUser);
     
     
    // dispatch({type:"ADD_USER",payload:nwUsr.data});
     this.props.history.push("/")
 
 }

  render() {
    const {name,department,salary} = this.state;
    const {addLoading} = this.props;
                    return (
      
                        <div className= "col-sm-6 col-12 mb-4 mx-auto">
                            <div className="card">
                                <div className ="card-header">
                                    <h4>ADD USER</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.addUser}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                            type = "text"
                                            name = "name"
                                            id = "id"
                                            placeholder = "Enter Name"
                                            className = "form-control"
                                            value = {name}
                                            onChange ={this.changeInput}
                                            
                                            />                        
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="department">Department</label>
                                            <input
                                            type = "text"
                                            name = "department"
                                            id = "department"
                                            placeholder = "Enter Deparment"
                                            className = "form-control"
                                            value = {department}
                                            onChange ={this.changeInput}
                                            />                        
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="salary">Salary</label>
                                            <input
                                            type = "text"
                                            name = "salary"
                                            id = "salary"
                                            placeholder = "Enter Salary"
                                            className = "form-control"
                                            value = {salary}
                                            onChange ={this.changeInput}
                                            />                        
                                        </div>
                                           
                                        <button className="btn btn-danger btn-block" onClick ={this.addUser}
                                        disabled={addLoading}>ADD USER</button>
                                    </form>
                                </div>
                
                            </div>
                        </div>
                      
                    )
    
  }
}
const mapStateToProps = state => ({
    loginUser : state.loginUser.loginUser,
    addLoading : state.loading["ADD"]
  })
  
  const mapDispatchToProps = dispatch => ({
    addUser : newUser=> dispatch(addUser(newUser)),
   // getLogin : () => dispatch(getLogin())
  
  })
export default connect(mapStateToProps,mapDispatchToProps)(AddUser);




