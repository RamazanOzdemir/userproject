import React, { Component } from 'react'
import {connect} from "react-redux"
import {updatedUser,getUsers} from "../store/actions"
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
 componentWillReceiveProps =()=>{
    const {id} = this.props.match.params;
    const {users} = this.props
    const user = users.filter(user=>user.id===id)
    const willUpdate = user[0]
    if(willUpdate!==undefined)
    this.setState({
        name : willUpdate.name,
        salary : willUpdate.salary,
        department : willUpdate.department
    })
 }
 updateUser =  (e) =>{
     e.preventDefault();
     const {name,department,salary} = this.state;
     const {id}=this.props.match.params;
     const {updateLoading} = this.props
     const newUser ={
        id : id,
        name : name,
        department : department,
        salary : salary,
        updatedDate : Date.now()
     }
     
     this.props.updatedUser(newUser);
     if(!updateLoading)
     this.props.history.push("/")
 }

 componentDidMount =  ()=>{
     this.props.getUsers()
 
 
 }

  render() {
    const {name,department,salary} = this.state
    const {updateLoading} = this.props

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
                    
                        <button className="btn btn-danger btn-block" onClick ={this.updateUser}
                        disabled={updateLoading}>UPDATE USER</button>
                    </form>
                </div>

            </div>
        </div>
      
    )
    
  }
}
const mapStateToProps = state => ({
    users : state.users.list,
    updateLoading : state.loading["UPDATE"]
  })
  
  const mapDispatchToProps = dispatch => ({
    updatedUser : newUser=> dispatch(updatedUser(newUser)),
    getUsers: () => dispatch(getUsers())
    
  
  })
export default connect(mapStateToProps,mapDispatchToProps)(UpdatedUser);

