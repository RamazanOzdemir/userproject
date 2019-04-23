import React, { Component } from 'react'
import User from "./User";
import {connect} from "react-redux";
//import {getUsers} from "../store/actions"

 class UpdatedUsers extends Component {
  componentDidMount(){
    //this.props.getUsers();
    //this.props.getLogin();
    
  }
  render() {
      
    const {users,usersLoading,loginUser} = this.props;
    const x = Date.now()-86400000;
     return (
       <div className ="col-12 mt-2">
       <div className="col-12 col-sm-6 mx-auto ">
        <h1 className ="bg-danger text-white mb-3 text-center rounded" 
        >UPDATED USERS</h1></div>

           {
               
               
                 usersLoading?
                 <div className="col-12 col-sm-6 mx-auto ">
                   <div className="spinner-border" role="status">
                     <span className="sr-only">Loading...</span>
                   </div>
                 </div>
                 :    
               users.filter(user=>!user.isTrash&&user.loginId===loginUser[0].id&&user.updatedDate>x).map(user=>{
                 
                 
                   return(
                    <User
                    key = {user.id}
                    id = {user.id}
                    name = {user.name}
                    department ={ user.department}
                    salary = {user.salary}
                    isTrash={user.isTrash}
                    
                    />
                   )
                 
               })                            
                 }
         </div>
       )
    
  }
}  
const mapStateToProps = state => ({
  users : state.users.list,
  loginUser : state.loginUser.loginUser,
  usersLoading: state.loading['USERS'] 
})

const mapDispatchToProps = dispatch => ({
  //getUsers: () => dispatch(getUsers()),
  //getLogin : () => dispatch(getLogin())

})
export default connect(mapStateToProps,mapDispatchToProps)(UpdatedUsers);
