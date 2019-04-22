import React, { Component } from 'react'

import axios from "../layout/AxiosInstance"
import {connect} from "react-redux"
import {updatedUser} from "../store/actions"
class UpdatedUser extends Component {
    state = {
        
        name : "",
        department :"",
        salary : ""
    }
 
 changeInput = (e)=>{
     this.setState({
        [ e.target.name] : e.target.value
     })
 }
 // formlarda eklenen buton default olarak submit yapıp sayfayı yeniliyor.
 // Bunu e.preventDefault metodu ile engelliyebiliriz.
 updateUser =  (e) =>{
     e.preventDefault();
     const {name,department,salary} = this.state;
     const {id}=this.props.match.params;
     
     const newUser ={
        id : id,
        name : name,
        department : department,
        salary : salary,
        updatedDate : Date.now()
     }
     
     axios.patch(`/users/${id}`,newUser).then(resp => this.props.updatedUser(resp.data));

    // dispatch({type:"UPDATE_USER",payload:nwUsr.data});
     
     this.props.history.push("/")
      
      
 }
 componentDidMount = async ()=>{
     const {id} = this.props.match.params;
     const response = await axios.get(`http://localhost:3004/users/${id}`);
     const {name,department,salary} = response.data
     this.setState({
         name ,
         department ,
         salary
     });
 }
  render() {
    const {name,department,salary} = this.state
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
                    
                        <button className="btn btn-danger btn-block" onClick ={this.updateUser}>UPDATE USER</button>
                    </form>
                </div>

            </div>
        </div>
      
    )
    
  }
}
const mapStateToProps = state => ({
    
  })
  
  const mapDispatchToProps = dispatch => ({
    updatedUser : newUser=> dispatch(updatedUser(newUser)),
  
  })
export default connect(mapStateToProps,mapDispatchToProps)(UpdatedUser);

