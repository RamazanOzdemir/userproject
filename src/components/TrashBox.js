import React, { Component } from 'react'
import User from "./User";
import UserConsumer from "../context";
import axios from "../layout/AxiosInstance";
 class TrashBox extends Component {
  allDelete =  (dispatch,users,e)=>{
    users.filter(user=>{return user.isTrash}).forEach  (user=>{
       dispatch({type:"DELETE_TRASH",payload :user.id})
       axios.delete(`users/${user.id}`).then(resp=>console.log(`all kalıcı silme => ${resp.status}`)).catch(console.error())
    })
  }
  allReload =  (dispatch,users,e)=>{
    users.filter(user=>{return user.isTrash}).forEach  (user=>{
       dispatch({type:"RELOAD_USER",payload :user.id})
       axios.patch(`users/${user.id}`,{isTrash:false}).catch(console.error())
    })
  }
  render() {
      
      return(
          // value paremetresini alan arrow funct javascript işlemi yapıldığı için süslü parentez içinde
        <UserConsumer>
            
            {
                value =>{
                    const {users,dispatch,loginUser} = value;
                        return (
                            <div className="col-12  mt-2 ">
                              <div className="col-12 col-sm-6 mx-auto">
                              <button className ="btn btn-block btn-danger mb-3"
                              onClick={this.allDelete.bind(this,dispatch,users)}
                              >DELETE ALL USERS</button>
                               <button className ="btn btn-block btn-info mb-3"
                              onClick={this.allReload.bind(this,dispatch,users)}
                              >ALL USERS RELOAD</button></div>
                              {
                                  users.filter(user=>{return user.isTrash&&user.loginId===loginUser[0].id}).map(user=>{
                                    
                                    
                                      return(
                                        
                                          <User
                                          key = {user.id}
                                          id = {user.id}
                                          name = {user.name}
                                          department ={ user.department}
                                          salery = {user.salery}
                                          isTrash = {user.isTrash}
                                          />
                                      
                                      )
                                    
                                  })                            
                                    }
                             </div>
                          )
                    
                }
             }
        </UserConsumer>
    )
    
  }
}
export default TrashBox;