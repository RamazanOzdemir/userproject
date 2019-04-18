import React, { Component } from 'react';
import UserConsumer from "../context";
import {Link} from "react-router-dom";
import axios from "../layout/AxiosInstance"

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
  onReLoad = (dispatch,e)=>{
    const {id} = this.props;
    dispatch({type : "RELOAD_USER", payload : id});
    axios.patch(`users/${id}`,{isTrash:false}).catch(console.error())
  }
  onDeleteUser = async (dispatch,e)=>{
      const {id,isTrash} = this.props;
      let isOK = false;
      
      
      !isTrash?  isOK=window.confirm("Bu user' çöp kutusuna taşımak istiyor musunuz?").valueOf()
              : isOK=window.confirm("Bu user' çöp kutusundan kalıcı olarak silmek istiyor musunuz?").valueOf()
     //Consumer Dispatch
     if(isOK&&isTrash){
      dispatch({type : "DELETE_TRASH", payload : id})
      fetch(`http://localhost:3004/users/${id}`,{method: 'DELETE'}).then(resp=>console.log(`kalıcı silme => ${resp.status}`)).catch(console.error())
    }
     else if(isOK){
     dispatch({type : "DELETE_USER", payload : id});
     axios.patch(`users/${id}`,{isTrash:true}).then(resp=>console.log(`geciçi silme => ${resp.status}`)).catch(console.error())
     }

  }
  render() {

      //Destructing
      const {id,name,salery,department,isTrash} = this.props;
      const {isVisible} = this.state;
      
    return(
        <UserConsumer>
      {
        value=>{
          const {dispatch,status} =value
            return(
              <div className="col-10 col-sm-4 mb-4 mx-auto ">
              {
                  status !== 200?
                   <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                  :
                           
                      <div className="card">
                      <div className="card-header d-flex justify-content-between"  style ={isVisible ? {backgroundColor :"#a4d4ff",color:"#ffffff"}: null}>
                          <h4 className="d-inline" onClick = {this.onClickEvent} style ={{cursor:"pointer"}}>{name}</h4> 
                          <div> 
                           {isTrash? <i class="fas fa-cloud-upload-alt" onClick = {this.onReLoad.bind(this,dispatch)} style={{cursor:"pointer"}}></i>
                            :null 
                          }
                            <i className="fas fa-trash-alt ml-1" onClick = {this.onDeleteUser.bind(this,dispatch)} style={{cursor:"pointer"}}></i>      
                          </div>
                      </div>
                      {
                      isVisible?
                      <div className="card-body">
                          <p className="card-text">Department : {department}</p>
                          <p className="card-text">Salery : {salery}</p>
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
    </UserConsumer>
    )   
  }
 }
export default User;