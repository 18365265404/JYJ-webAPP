import React,{Component} from 'react';
import '../assets/css/ThemeDetail.css';
import querystring from 'query-string';
import { Select } from 'antd';
export default class ThemeList extends Component{

    constructor(props){
        super(props);
        this.state= {
            name:querystring.parse(props.location.search).title
        };
       

        console.log(querystring.parse(props.location.search).title,"传过来的名字")


        
      }


      
  render(){
    let {history,match} = this.props;

    
    
    

    return (
      <div className="themeDetail">
      {/* title */}
          <div className="themeDetail-head">
                <p onClick={()=>{history.go(-1)}}>＜</p>
                <span>{this.state.name}</span>
                <img src="../assets/img/zan.png" alt=""/>
          </div>

       <div className="themeDetail-center">
          {/*头部图  */}
          <div className="themeDetail-banner">
              <img src="../assets/images/img_1.jpg" alt=""/>

              {/* 介绍 */}
              <div className="themeDetail-infor">
                <span>宴会厅介绍</span>
                <p>我是内容2</p>
                <p>我是内容3</p>
                <p>我是内容4</p>
           </div>
          </div>

          {/* detial */}
          <div className="themeDetail-detail">
                <span>宴会厅详情</span>
                <p>我是内容2</p>
                <p>我是内容3</p>
                <p>我是内容4</p>
          </div>
        
          {/* menue */}
          <div className="themeDetail-menue">
                <span>宴会厅菜单</span>
                <p>我是内容2</p>
                <p>我是内容3</p>
                <p>我是内容4</p>
          </div>
        </div>

        

          <div className="themeDetail-bottom">
                <div className="themeDetail-left">
                    <span>分享</span>
                    <span>收藏</span>
                    <span>客服</span>
                </div>
                <div className="themeDetail-right">
                    <span>分享</span>
                    <span>收藏</span>
                    <span>客服</span>
                </div>
          </div>


      </div>
    )
  }
}