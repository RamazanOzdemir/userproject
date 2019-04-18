import React, { Component } from 'react'
import UserConsumer from "../context"
import axios from "axios"

class UpdatedUser extends Component {
    state = {
        
        name : "",
        department :"",
        salery : ""
    }
 
 changeInput = (e)=>{
     this.setState({
        [ e.target.name] : e.target.value
     })
 }
 // formlarda eklenen buton default olarak submit yapıp sayfayı yeniliyor.
 // Bunu e.preventDefault metodu ile engelliyebiliriz.
 updateUser = async (dispatch ,e) =>{
     e.preventDefault();
     const {name,department,salery} = this.state;
     const {id}=this.props.match.params;
     
     const newUser ={
        id : id,
        name : name,
        department : department,
        salery : salery,
        updatedDate : Date.now()
     }
     
     const nwUsr = await axios.patch(`http://localhost:3004/users/${id}`,newUser);

     dispatch({type:"UPDATE_USER",payload:nwUsr.data});
     
     this.props.history.push("/")
      
      
 }
 componentDidMount = async ()=>{
     const {id} = this.props.match.params;
     const response = await axios.get(`http://localhost:3004/users/${id}`);
     const {name,department,salery} = response.data
     this.setState({
         name ,
         department ,
         salery
     });
 }
  render() {
    const {name,department,salery} = this.state
    return(
        <UserConsumer>
            {
                value =>{
                    const {dispatch} = value;
                    return (
      
                        <div className= "col-sm-6 col-12 mb-4 mx-auto">
                            <div className="card">
                                <div className ="card-header">
                                    <h4>UPDATE USER</h4>
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
                                    
                                        <button className="btn btn-danger btn-block" onClick ={this.updateUser.bind(this,dispatch)}>UPDATE USER</button>
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
export default UpdatedUser;
