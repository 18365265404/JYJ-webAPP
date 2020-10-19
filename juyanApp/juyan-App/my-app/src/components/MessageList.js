import React,{Component} from 'react';
import '../assets/css/messageList.css';

import querystring from 'query-string';
import {postRequest,getRequest,postReqLogin} from '../utils/api';
import { Toast} from 'antd-mobile';
import url from '../utils/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Select, Checkbox,Button} from 'antd';
import { getCookie } from '../utils/utils';
import { lang } from 'moment';





export default class CollectList extends Component{

  constructor(props){
    super(props);
    this.state={
      name:querystring.parse(props.location.search).title,
      qiNiuUrl:"",
      list:[],
      firstList:[],
      refreshing: false,
      down: true,
      currentPage:"1",
      pageNum:"",
      height: document.documentElement.clientHeight,
      data: [],
      ids:"",
      prices:"",
      style:"",
      noDataStyle:"none",
      loadMoreStyle:"block",
      collectionTypes:"",
      pages:"",//总页数

      checkedList: [],
      chooseId:"",
      indeterminate: false,
      checkAll: false,


      detailPath:""
    }

  };
  
  changebox(index,status){
    // console.log(index,status,"234");
    this.state.list[index].isCheck=!this.state.list[index].isCheck
    console.log(this.state.list)
    this.setState({
        
      list:this.state.list
    })
    let cList=this.state.list
    let chooseCheck=[]
    for(let i=0;i<cList.length;i++){
      if(!cList[i].isCheck){
          this.setState({
            checkAll:false
          })
      }
      if(cList[i].isCheck){
        chooseCheck.push(cList[i].id)
      }
    }

    if(chooseCheck.length==cList.length){
      this.setState({
        checkAll:true
      })
    }
    console.log("选中的所有ID",chooseCheck)
  
  }

  onChange(e) {
    this.state.checkAll=!this.state.checkAll
    let cList=this.state.list;

    console.log("展示所有数据",this.state.list)
    if(this.state.checkAll){
     
      for(let i=0;i<cList.length;i++){
        cList[i].isCheck=true
      }

    }

    if(!this.state.checkAll){
      
       for(let i=0;i<cList.length;i++){
         cList[i].isCheck=false
       }

     }

      
     this.setState({
      list:cList
    })
    
  }
  delet(){

    let cList=this.state.list
    let chooseCheck=[]
    let chooseCheckStr=""
    for(let i=0;i<cList.length;i++){
     
      if(cList[i].isCheck){
        // chooseCheck.push(cList[i].id)
        chooseCheckStr+=cList[i].id+","
      }
    }

    chooseCheckStr = chooseCheckStr.substr(0, chooseCheckStr.length - 1);
    console.log("选中的所有ID",chooseCheckStr)
    
    const _this=this;
    postReqLogin(url.curDeltePush, {
      HotelUserId:getCookie("userId"),
      pushId:chooseCheckStr
    }).then(resp=> {
      if(resp.data.status!="200"){
        Toast.info("信息有误，请重新登录", 1);
        this.props.history.push("/Login");
          return
      }
      console.log("所有消息打印的数据",resp.data)
      let cList=resp.data.data.list;
      for(let i=0;i<cList.length;i++){
          cList[i]["isCheck"] =false
      }
        this.setState({
          list:resp.data.data.list,
          pages:resp.data.data.pages,
          currentPage:"1"
        })

        if(resp.data.data.list.length==0){
          this.setState({
              noDataStyle:"block"
          })
      }else{
          this.setState({
              noDataStyle:"none"
          })
      }

      if(resp.data.data.pages==1){
          this.setState({
              loadMoreStyle:"none"
          })
      }else{
          this.setState({
              loadMoreStyle:"block"
          })
      }
            

    });
    
      
  }

  componentDidMount(){
    const _this=this;
    postReqLogin(url.curFindAllPush, {
      HotelUserId:getCookie("userId"),
    }).then(resp=> {
      if(resp.data.status!="200"){
        Toast.info("信息有误，请重新登录", 1);
        this.props.history.push("/Login");
          return
      }
      console.log("所有消息打印的数据",resp.data)
      let cList=resp.data.data.list;
      for(let i=0;i<cList.length;i++){
          cList[i]["isCheck"] =false
      }
        this.setState({
          list:resp.data.data.list,
          pages:resp.data.data.pages,
        })

        if(resp.data.data.list.length==0){
          this.setState({
              noDataStyle:"block"
          })
      }else{
          this.setState({
              noDataStyle:"none"
          })
      }

      if(resp.data.data.pages==1){
          this.setState({
              loadMoreStyle:"none"
          })
      }else{
          this.setState({
              loadMoreStyle:"block"
          })
      }
            

    });

    
/**
 * *************************************************下拉上啦代码start***************************************************************************
*/
const wrapper = this.refs.wrapper;
const loadMoreDataFn = this.loadMoreDataFn;
const that = this; // 为解决不同context的问题
let timeCount;


function callback() {
        const top = wrapper.getBoundingClientRect().top;
        const windowHeight = window.screen.height;

        if (top && top < windowHeight) {
          // 当 wrapper 已经被滚动到页面可视范围之内触发
          loadMoreDataFn(that);
        }
}

window.addEventListener('scroll', function () {
        if (this.state.isLoadingMore) {
            return ;
        }

        if (timeCount) {
            clearTimeout(timeCount);
        }

        timeCount = setTimeout(callback, 50);
    }.bind(this), false);
    }
    // --------------------------加载更多------------------------------
    loadMoreDataFn(that) {
      // const _this=that;
      that.state.currentPage++;
      if(that.state.currentPage> that.state.pages){
        Toast.info('没有更多了', 1);
        return
      }
      postReqLogin(url.curFindAllPush, {
        HotelUserId:getCookie("userId"),

        pageNum: that.state.currentPage, 
      }).then(resp=> {
              console.log("加载更多打印的数据",resp.data)
              let cList=resp.data.data.list;
              for(let i=0;i<cList.length;i++){
                  cList[i]["isCheck"] =false
              }
              that.setState({
                list:that.state.list.concat(
                  resp.data.data.list
                ),
                pages:resp.data.data.pages
              })

              if(resp.data.data.list.length==0){
                this.setState({
                    noDataStyle:"block"
                })
            }else{
                this.setState({
                    noDataStyle:"none"
                })
            }
              
      });

      


    }


  render(){




      return(
        <div className="collectList" style={{display:"flex",flexDirection:"column"}}>
          <div className="public-title2">
          <p className="public-back2" onClick={()=>{history.go(-1)}}>
                <img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem"}}/>
            </p>
            <span>消息列表</span>
            <a style={{opacity:"0"}}>
                  <img  src="../assets/img/icon_search.png" />
            </a>

          </div>
            
          <div style={{flex:"1",overflowY: "auto"}}>
            <div className="MessageList-content-list" >
                <div className="noDataShow" style={{display:this.state.noDataStyle}}>
                    <p >暂无数据...</p> 
                </div>
              

              {/* 列表 */}
              <ul className="collectList-list">
            {
                  this.state.list.map((item,index)=>{
                      return(
                        <li key={item.id} style={{width:"96%",margin:"0.2rem auto", height:"2rem",borderRadius:"0.23rem",background:"white" }}>
                          
                          <div style={{position:"relative"}}>
                            <p style={{fontSize:"0.32rem",margin:"0.2rem 0.2rem"}}>创建的时间：{item.dateTime}</p>
                            <p style={{fontSize:"0.32rem",margin:"0.2rem 0.2rem",display:"flex"}}>查看状态：{item.status=="false" ? "未查看" : "已查看"}<span style={{ display:`${item.status=="false" ? "block" : "none"}`,height:"0.5rem",width:"0.5rem" ,lineHeight:"100%",textAlign:"center",color:"white", border:"1px solid red",borderRadius:"50%", background:"red"}}>1</span></p>
                            <p className="push-content">推送的内容：{item.pushContent}</p>
                            <Checkbox onChange={this.changebox.bind(this,index,item.isCheck)} checked={item.isCheck} style={{position:"absolute",right:"0.2rem",top:"0.8rem",zIndex:"10000"}} ></Checkbox>
                            <Link to={"/MessageDetail/"+item.id} >
                            <Button type="primary"style={{position:"absolute",right:"2.5rem",top:"0.8rem",zIndex:"10000"}}>
                                查看详情
                            </Button>
                            </Link>
                          </div>
                          
                       
                      

                        </li>
                      )
                  })

                }
                 <div style={{display:this.state.loadMoreStyle}} className="loadMore" ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>加载更多</div>
              </ul>
            </div>  
            </div>  

            <div style={{width:"100%",height:"1.2rem", display:`${this.state.list.length=='0' ? 'none':'block'}`}}>
                  <div style={{width:"96%",margin:"0 auto",background:"white",display:"flex",justifyContent:"space-between"}}>
                  <div style={{width:"2rem",marginLeft:"0.2rem"}}><Checkbox checked={this.state.checkAll} onChange={this.onChange.bind(this)}>全选</Checkbox></div>
                  <div style={{width:"2rem",marginRight:"0.2rem", }}>
                  <Button type="primary" onClick={this.delet.bind(this)}  style={{marginTop:"-0.3rem", width:"2rem",height:"0.93rem",margin:"0 auto",textAlign:"center",marginTop:"0.5rem" }}>
                            删除
                  </Button>
                  </div>
                       
                      
                        
                       
                  </div>
            </div>
        </div>
      )

  }

}