import React, { Component } from 'react'
import UserConsumer from '../context';

class SideNavbar extends Component {
  state ={
    screen : window.innerWidth
  }
  sideBarOpen=(isOpen)=>{
    if(isOpen)
        return 40
    else
        return 0

  }

  change =(e)=>{
    this.setState({screen:window.innerWidth})

    
  }
  render() {
     
    
    return (
        <UserConsumer>
            {
                value=>{
                    const {isOpen,side} = value;
                    const {screen} = this.state;
                    window.addEventListener("resize",this.change)
                    
                    return(
                      
                        
                     
                        <div className="  fixed-top d-flex sidebar " 
                        style={screen<576?{width:`${this.sideBarOpen(isOpen)}%`}:{width:"15%"}}>
                        
                        <div className="navbar-nav px-2">
                           {screen<576? <span className="navbar-brand mt-1 ml-auto" style={{color:"white",cursor:"pointer"}}
                          onClick ={isOpen?side:null}>X</span>:null}
                          <ul className="navbar-nav ml-auto ">
                            <li className="nav-item " style={{marginTop:"100%"}}>
                              <a href="/add"  >ADD USER</a><hr/>
                            </li>
                            <li className="nav-item ">
                              <a href="/newUsers">NEW USERS</a><hr/>
                            </li>
                            <li className="nav-item ">
                              <a href="/updatedUsers">UPDATED USERS</a><hr/>
                            </li>

                            <li className="nav-item" style={{marginTop:"40%"}}>
                              <a href="/trashbox" >TRASH BOX</a>
                            </li>
                          </ul>
                          </div>  
                        </div>
                        
                    
                      

                        
                    )
                }
            }
        </UserConsumer>
  
    )
  }
}

export default SideNavbar;
