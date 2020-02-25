import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { deleteUser,deleteTrashUser,reloadUser } from '../store/actions';


 class User extends Component {
     state = {
         isVisible : false,
         isNotVisible: true
     }

  onClickEvent = (e) =>{
      this.setState({
          isVisible : !this.state.isVisible
      });
      
  }
  onReLoad = (e)=>{
    const {id,reLoading} = this.props;
     if(!reLoading)
     this.props.reloadUser(id)
   
  }
  onDeleteUser = async (e)=>{
      const {id,isTrash,deleteLoading,trashLoading} = this.props;
      let isOK = false;
      
      
      !isTrash?  isOK=window.confirm("Bu user'ı çöp kutusuna taşımak istiyor musunuz ????").valueOf()
              : isOK=window.confirm("Bu user'ı çöp kutusundan kalıcı olarak silmek istiyor musunuz?").valueOf()
     
     if(isOK&&isTrash&&!trashLoading){
      this.props.deleteTrashUser(id)
     
    }
     else if(isOK&&!deleteLoading){
      this.props.deleteUser(id);
      
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
                      <i className="fas fa-trash-alt ml-1" 
                      onClick = {this.onDeleteUser} style={{cursor:"pointer"}}
                     ></i>      
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
  deleteLoading : state.loading["DELETE"],
  trashLoading : state.loading["TRASH"],
  reLoading : state.loading["RELOAD"]
})

const mapDispatchToProps = dispatch => ({
  deleteUser : id => dispatch(deleteUser(id)),
  deleteTrashUser : id => dispatch(deleteTrashUser(id)),
  reloadUser : id => dispatch(reloadUser(id))
})
export default connect(mapStateToProps,mapDispatchToProps) (User);