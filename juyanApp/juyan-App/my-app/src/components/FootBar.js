import React,{Component} from 'react';
import '../assets/css/footbar.css'
import {Link,NavLink} from 'react-router-dom';

export default class FootBar extends Component{
  render(){
    return (
      <div id="foot-btn" className="foot-btn" >
        <ul id="ul">
          <li><NavLink to="/home" className="home" activeClassName="home1">首页</NavLink></li>
          <li><NavLink to="/follow" className="write" activeClassName="write1">文章页</NavLink></li>
          <li><NavLink to="/user" className="my" activeClassName="my1">个人中心</NavLink></li>
        </ul>
      </div>
    )
  }

  componentDidMount(){
    
            const box = document.getElementById('foot-btn');
            console.log(box.offsetHeight,"底部table的高度")
         
        }
}