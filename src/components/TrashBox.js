import React, { Component } from 'react'
import User from "./User";

import { connect } from 'react-redux';
import { deleteTrashUser ,reloadUser} from '../store/actions';
 class TrashBox extends Component {

  allDelete =  (users,e)=>{
    const {deleteTrashUser} = this.props
    users.filter(user => user[1].isTrash)
         .forEach  (user=>{
           deleteTrashUser(user[0])
    })
  }
  
  allReload =  (e)=>{
    const {users,loginUser,reloadUser} = this.props
    users.filter(user => user[1].isTrash)
         .forEach(user=>{
          reloadUser(user[0])
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
            users.filter(user =>user[1].isTrash )
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