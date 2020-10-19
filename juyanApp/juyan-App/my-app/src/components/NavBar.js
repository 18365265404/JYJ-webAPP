import React,{Component} from 'react';
import '../assets/css/navbar.css'
import {Link,NavLink} from 'react-router-dom';

export default class NavBar extends Component{
  render(){
    return (
      <div className="nav">
        <ul>
          <li><NavLink to="/home" activeClassName="active">首页</NavLink></li>
          <li><NavLink to="/follow" activeClassName="active">关注</NavLink></li>
          <li><NavLink to="/column" activeClassName="active">栏目</NavLink></li>
        </ul>
      </div>
    )
  }
}