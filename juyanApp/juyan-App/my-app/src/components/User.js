import React,{Component} from 'react';

import '../assets/css/mydoc.css';

export default class User extends Component{
  render(){
    return (
      <div id="content">
        <div id="header">
          <h2><img src="../assets/img/headimg.png" alt=""/></h2>
          <div className="user-box">
            <a href="login_m.html">登录</a>
            <a href="reg_m.html">注册</a>
          </div>
          <ul className="clear">
            <li>
              <span>0</span>
              <p>关注</p>
            </li>
            <li>
              <span>0</span>
              <p className="end">粉丝</p>
            </li>
          </ul>
        </div>
        <div className="docList">
          <ul>
            <li className="gk-text">
              <i></i>
              <p>公开博文</p>
              <b></b>
              <span>0</span>
            </li>
            <li className="mm-text">
              <i></i>
              <p>秘密博文</p>
              <b></b>
              <span>0</span>
            </li>
            <li className="cg-text">
              <i></i>
              <p>草稿箱</p>
              <b></b>
              <span>0</span>
            </li>
            <li className="sc-text">
              <i></i>
              <p>收藏夹</p>
              <b></b>
              <span>0</span>
            </li>
            <li className="my_cz">
              <i></i>
              <p>收藏夹</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}