import React, { Component } from 'react'
import User from "./User";

import { connect } from 'react-redux';
import { deleteTrashUser ,reloadUser} from '../store/actions';
 class TrashBox extends Component {

  allDelete =  (users,e)=>{
    const {deleteTrashUser} = this.props
    users.filter(user=>{return user.isTrash}).forEach  (user=>{
      
       deleteTrashUser(user.id)
    })
  }
  
  allReload =  (e)=>{
    const {users,loginUser,reloadUser} = this.props
    users.filter(user => user.isTrash&&user.loginId===loginUser[0].id).forEach  (user=>{
      
      reloadUser(user.id)
    })
  }

  render() {
      
      const {users,loginUser} = this.props
      
      return(
        
          <div className="col-12  mt-2 ">
            <div className="col-12 col-sm-6 mx-auto">
            <button className ="btn btn-block btn-danger mb-3"
            onClick={this.allDelete.bind(this,users)}
            >DELETE ALL USERS</button>
             <button className ="btn btn-block btn-info mb-3"
            onClick={this.allReload}
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
const mapStateToProps = state => ({
  users : state.users.list,
  loginUser : state.loginUser.loginUser,
})

const mapDispatchToProps = dispatch => ({
  deleteTrashUser: id => dispatch(deleteTrashUser(id)),
  reloadUser : id => dispatch(reloadUser(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(TrashBox);