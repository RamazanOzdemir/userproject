import React, { Component } from 'react'
// import posed from "react-pose"; animation için yüklenmişti
import UserConsumer from "../context"
import axios from "axios"
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
        salery : ""
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
 addUser = async (dispatch ,loginUser,e) =>{
     e.preventDefault();
     const {name,department,salery} = this.state
     const newUser ={
        loginId :loginUser[0].id,
        name : name,
        department : department,
        salery : salery,
        creationDate : Date.now(),
        updatedDate : Date.now(),
        isTrash : false
     }
     
     const nwUsr = await axios.post("http://localhost:3004/users",newUser);

     dispatch({type:"ADD_USER",payload:nwUsr.data});
     this.props.history.push("/")
 
 }

  render() {
    const {name,department,salery} = this.state
    return(
        <UserConsumer>
            {
                value =>{
                    const {dispatch,loginUser} = value;
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
                                            <label htmlFor="salery">Salery</label>
                                            <input
                                            type = "text"
                                            name = "salery"
                                            id = "salery"
                                            placeholder = "Enter Salery"
                                            className = "form-control"
                                            value = {salery}
                                            onChange ={this.changeInput}
                                            />                        
                                        </div>
                                           
                                        <button className="btn btn-danger btn-block" onClick ={this.addUser.bind(this,dispatch,loginUser)}>ADD USER</button>
                                    </form>
                                </div>
                
                            </div>
                        </div>
                      
                    )
                }
            }
        </UserConsumer>
    )
    
  }
}
export default AddUser;




