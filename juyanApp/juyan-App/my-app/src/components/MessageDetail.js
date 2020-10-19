import React,{Component} from 'react';
import '../assets/css/messageDetail.css';

import querystring from 'query-string';
import {postRequest,getRequest,postReqLogin} from '../utils/api';
import { Toast} from 'antd-mobile';
import url from '../utils/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Select, Checkbox,Button} from 'antd';
import { getCookie } from '../utils/utils';






export default class CollectList extends Component{

  constructor(props){
    super(props);
    this.state={
        id:this.props.match.params.id,
        dateTime:"",
        pushContent:"",

    }

  }
  
  del(){
      console.log("id",this.state.id)
    postReqLogin(url.curDeltePush, {
        HotelUserId:getCookie("userId"),
        pushId:this.state.id

      }).then(resp=> {
        if(resp.data.status!="200"){
          Toast.info("信息有误，请重新登录", 1);
          this.props.history.push("/Login");
            return
        }
        console.log("删除消息打印的数据",resp.data)
        this.props.history.go(-1);
  
         
      });
  }
  componentDidMount(){
      console.log("打印传递管来的ID",this.state.id)
    const _this=this;
    postReqLogin(url.cuFindById, {
      id:this.state.id,
    }).then(resp=> {
      if(resp.data.status!="200"){
        Toast.info("信息有误，请重新登录", 1);
        this.props.history.push("/Login");
          return
      }
      console.log("所有消息打印的数据",resp.data)
        this.setState({
            dateTime:resp.data.data.dateTime,
            pushContent:resp.data.data.pushContent,
        })

       
    });
// 修改查看状态
    postReqLogin(url.curUpdatePushStatus, {
        id:this.state.id,
      }).then(resp=> {
        if(resp.data.status!="200"){
          Toast.info("信息有误，请重新登录", 1);
          this.props.history.push("/Login");
            return
        }
        console.log("修改消息状太打印的数据",resp.data)

  
         
      });

    


      

      

    }


  render(){




      return(
        <div className="collectDetail" style={{display:"flex",flexDirection:"column"}}>
          <div className="public-title2">
          <p className="public-back2" onClick={()=>{history.go(-1)}}>
                <img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem"}}/>
            </p>
            <span>消息详情</span>
            <a style={{opacity:"0"}}>
                  <img  src="../assets/img/icon_search.png" />
            </a>

          </div>
            
          <div style={{flex:"1",overflowY: "auto"}}>
            <div className="collectDetail" style={{width:"96%", marginLeft:"2%", }} >
               
              <div style={{margin:"0 auto",minHeight:"5rem", marginTop:"0.3rem", borderRadius:"0.25rem",lineHeight:"0.6rem",background:"white",fontSize:"0.45rem"}}>
              <p  style={{marginLeft:"0.2rem",padding:"0.3rem 0",borderBottom:"1px solid #cccccc"}}><span>消息发送时间：{this.state.dateTime}</span></p>
              <p  style={{marginLeft:"0.2rem",lineHeight:"0.6rem",fontSize:"0.35rem"}}><span style={{color:"#333333"}}>消息详情：</span><span>{this.state.pushContent}</span></p>
              </div>
              <div>
              <Button type="primary" onClick={this.del.bind(this)}  style={{width:"100%",height:"0.93rem",margin:"0 auto",textAlign:"center",marginTop:"0.5rem" }}>
                            删除此条信息
              </Button>
              </div>  
            </div>  
            </div>

        </div>
      )

  }

}