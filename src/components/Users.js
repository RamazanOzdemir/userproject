import React, { Component } from 'react'
import User from "./User";
import { connect } from 'react-redux';
import { getUsers } from '../store/actions';

 class Users extends Component {
  componentDidMount(){
    this.props.getUsers();
  }
  render() {
      const status = 200;
      const {users} = this.props;

      return (
        <div className="col-12 mt-2">
          <div className="col-12 col-sm-6 mx-auto ">
            <h1 className="bg-danger text-white mb-3 text-center rounded">
              ALL USERS
            </h1>
          </div>
          {status !== 200 ? (
            <div className="spinner-border d-flex" role="status">
              <span className="sr-only mx-auto">Loading...</span>
            </div>
          ) : (
            users
              // .filter(user => {
              //   return !user.isTrash && user.loginId === loginUser[0].id;
              // })
              .map(user => {
                return (
                  <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    department={user.department}
                    salery={user.salery}
                    isTrash={user.isTrash}
                  />
                );
              })
          )}
        </div>
      );
                    
                
    
    
  }
}  
const mapStateToProps = state => ({
  users : state.users.list
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})
export default connect(mapStateToProps, mapDispatchToProps)(Users);
