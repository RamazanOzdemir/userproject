import React, { Component } from 'react'
import User from "./User";
import { connect } from 'react-redux';
import axios from "axios"

 class Users extends Component {
  firebase = () =>{
    const url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBB8VV6P3qlc2LuczF_-VQtJpgAv_C3lus";
    axios.post(url,{email:"usesdsadsfsfrds@gamil.com",password:"123dsafdssasdsffsfs4",returnSecureToken:true}).then(resp=>console.log(resp))
    .catch(err=>console.log(err))
    
  }

  yaz = users=>{
    for(const x in users){
      console.log(users[x])
    }
  }
  render() {
      
      const {users,loginUser, usersLoading } = this.props;
    // usersLoading ise loading  
    // liste boşsa "bulunamadı hatası"
    // en son listemiz

      return (
        <div className="col-12 mt-2">
          <div className="col-12 col-sm-6 mx-auto ">
            <button className ="btn btn-info btn-block" onClick={this.firebase}>FIREBASE</button>
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
         // this.yaz(users[0])

           users.filter(user =>!user[1].isTrash )
              .map(user =>{
                
                return (
                  <User
                    key={user[0]}
                    id={user[0]}
                    name={user[1].name}
                    department={user[1].department}
                    salary={user[1].salary}
                    isTrash={user[1].isTrash}
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
