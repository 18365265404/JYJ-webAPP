import React,{Component} from 'react';

import '../assets/css/error.css';

export default class Error extends Component{
  render(){
    return (
      <div>
        <div className="error" style={{fontSize:"2rem",textAlign:"center",paddingTop:"4rem"}}>
          404
        </div>
        <p style={{fontSize:"0.6rem",textAlign:"center"}}>请重新打开网页 ~</p>
      </div>
      
    )
  }
}