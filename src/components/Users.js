import React, { Component } from 'react'
import User from "./User";
import { connect } from 'react-redux';


 class Users extends Component {

  render() {
      
      const {users,loginUser, usersLoading } = this.props;
    // usersLoading ise loading  
    // liste boşsa "bulunamadı hatası"
    // en son listemiz

      return (
        <div className="col-12 mt-2">
          <div className="col-12 col-sm-6 mx-auto ">
            <h1 className="bg-danger text-white mb-3 text-center rounded">
              ALL USERS
            </h1>
            </div>

        { usersLoading ?
            <div className="col-12 col-sm-6 mx-auto ">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                       </div></div>
          : 
         
            users.filter(user => !user.isTrash&&user.loginId === loginUser[0].id )
              .map(user => {
                
                return (
                  <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    department={user.department}
                    salary={user.salary}
                    isTrash={user.isTrash}
                  />
                );
              })
              
          }
        </div>
      );
                    
                
    
    
  }
}  
const mapStateToProps = state => ({
  users : state.users.list,
  loginUser : state.loginUser.loginUser,
  isOpen : state.isOpen.isOpen,
  usersLoading: state.loading['USERS'] 
  
  
})

export default connect(mapStateToProps)(Users);
