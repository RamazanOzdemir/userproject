import React from 'react'
import UserConsumer from '../context';

const kaydir =isOpen=>{
    if(isOpen)return 30
    else return 0
}
 function Main() {
  return (
      <UserConsumer>
          {
              value =>{
                const {isOpen} = value
               
                  return(
                    <div className="container-fluid" style={{marginLeft : `${kaydir(isOpen)}%`}}>
      
                    </div>
                  )
              }
          }
      </UserConsumer>
    
  )
}export default Main;
