import React from "react";
import {Link} from "react-router-dom"
import UserConsumer from "../context";
import axios from "axios"
//import PropTypes from 'prop-types'


const Navbar = (props)=>{
    const {title} = props;
    const logOut =(loginUser)=>{
        console.log(loginUser)
        axios.delete(`http://localhost:3004/loginUser/${loginUser[0].id}`)
        window.href="/"
    }
    return (
        <UserConsumer>
            {
                value =>{
                    const {side,loginUser} = value
                    let screen = window.innerWidth;
                    window.addEventListener("resize",()=>screen=window.innerWidth)
                    return(
                        
                       <div className="col-12 border border-dark fixed-top myheader px-0">
                        <nav className="navbar-nav navbar-expand bg-dark navbar-dark  pr-3 myheader ">
                            {screen<=576?<span className="navbar-nav mr-2 bg-light  my-auto fas fa-ellipsis-v size-3 fa-2x" 
                            onClick={side} style={{cursor:"pointer"}}
                            ></span>:null}
                            <a href="/" className="navbar-brand my-auto ml-sm-5 ">{title}</a>
                            <div className="collapse navbar-collapse" >
                            <ul className="navbar-nav ml-auto ">
                                <li className="nav-item active">
                                <Link to = "/" className = "nav-link">Home</Link>
                                </li>
                                <li className="nav-item active">
                                <Link to = "/add" className = "nav-link">Add User</Link>
                                </li>
                                <li className="nav-item active">
                                <a href="/" onClick={logOut.bind(this,loginUser)}  className = "nav-link">Log Out</a>
                                </li>
                            
                            </ul>
                            </div>
                        
                        </nav>
                        </div>
                    )
                }
            }

       
     </UserConsumer>

    )
}

export default Navbar;