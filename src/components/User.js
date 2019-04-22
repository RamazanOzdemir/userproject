import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "../layout/AxiosInstance"
import { connect } from 'react-redux';
import { deleteUser,deleteTrash,reloadUser } from '../store/actions';

//import PropTypes from 'prop-types'


 class User extends Component {
     state = {
         isVisible : false
     }
     //constructor (props){
      //   super(props);
       //  this.onClickEvent = this.onClickEvent.bind(this);
         
     //}
  onClickEvent = (e) =>{
      this.setState({
          isVisible : !this.state.isVisible
      });
      
  }
  onReLoad = (e)=>{
    const {id} = this.props;
     this.props.reloadUser(id)
    //dispatch({type : "RELOAD_USER", payload : id});
    axios.patch(`users/${id}`,{isTrash:false}).catch(console.error())
  }
  onDeleteUser = async (e)=>{
      const {id,isTrash} = this.props;
      let isOK = false;
      
      
      !isTrash?  isOK=window.confirm("Bu user' çöp kutusuna taşımak istiyor musunuz?").valueOf()
              : isOK=window.confirm("Bu user' çöp kutusundan kalıcı olarak silmek istiyor musunuz?").valueOf()
     
     if(isOK&&isTrash){
      this.props.deleteTrash(id)
      //dispatch({type : "DELETE_TRASH", payload : id})
      fetch(`http://localhost:3004/users/${id}`,{method: 'DELETE'}).catch(console.error())
    }
     else if(isOK){
      this.props.deleteUser(id);
      
     axios.patch(`users/${id}`,{isTrash:true}).catch(console.error())
     }

  }
  render() {

      //Destructing
      const {id,name,salary,department,isTrash} = this.props;
      const {isVisible} = this.state;
      
      return(
        <div className="col-10 col-sm-4 mb-4 mx-auto ">
        {             
                <div className="card">
                <div className="card-header d-flex justify-content-between"  style ={isVisible ? {backgroundColor :"#a4d4ff",color:"#ffffff"}: null}>
                    <h4 className="d-inline" onClick = {this.onClickEvent} style ={{cursor:"pointer"}}>{name}</h4> 
                    <div> 
                     {isTrash? <i className="fas fa-cloud-upload-alt" onClick = {this.onReLoad} style={{cursor:"pointer"}}></i>
                      :null 
                    }
                      <i className="fas fa-trash-alt ml-1" onClick = {this.onDeleteUser} style={{cursor:"pointer"}}></i>      
                    </div>
                </div>
                {
                isVisible?
                <div className="card-body">
                    <p className="card-text">Department : {department}</p>
                    <p className="card-text">Salary : {salary}</p>
                    <Link className="btn btn-dark btn-block" to={`/update/${id}`}>UPDATE USER</Link>
                </div>
                :null
                }
                </div>    
                
                    
        } 
              </div>
            
              ) 
  }
 }
 const mapStateToProps = state => ({
  status : state.status.status
})

const mapDispatchToProps = dispatch => ({
  deleteUser : id => dispatch(deleteUser(id)),
  deleteTrash : id => dispatch(deleteTrash(id)),
  reloadUser : id => dispatch(reloadUser(id))
})
export default connect(mapStateToProps,mapDispatchToProps) (User);