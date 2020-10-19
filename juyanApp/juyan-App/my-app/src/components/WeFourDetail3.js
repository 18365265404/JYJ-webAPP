import React,{Component} from 'react';
import '../assets/css/weFourDetail1.css';//四大金刚司仪和跟妆和摄像公用一个布局

import querystring from 'query-string';
import { Select } from 'antd';
import {postRequest,getRequest,postReqLogin} from '../utils/api';  //不同的请求
import url from '../utils/url';
import { Tabs, WhiteSpace, Badge,Toast } from 'antd-mobile';
import { Modal, Button ,Input ,Icon ,Popover} from 'antd';      //antd UI
import {getCookie,setCookie} from '../utils/utils';             //获取cookie
export default class WeFourDetail3 extends Component{

    constructor(props){
        super(props);
        this.state= {
            prevData:{
                name:querystring.parse(props.location.search).title,
                qiniu:querystring.parse(props.location.search).qiniu,
                imgUrl:querystring.parse(props.location.search).imgUrl,
                previousId:this.props.match.params.id,
                content1:querystring.parse(props.location.search).content1,
                content2:querystring.parse(props.location.search).content2,
                content3:querystring.parse(props.location.search).content3,
                content4:querystring.parse(props.location.search).content4,
                content5:querystring.parse(props.location.search).content5,



                
            },
            userName: '', //表单提交的名字
            telNum: '',//表单提交的手机
            state :{ visible: false },
            detailList:[],
            menueList:[]

            
        };
       

        console.log(this.props.match.params.id,"传过来的id")
        

        
      }
/*****************10/8 收藏点击***************/  
handleVisibleChange = (visible2) => {
    if(!getCookie("token")){
        this.setState({ visible2 });
        return
    }

    console.log("当前的收藏状态",this.state.ifCollect)

    let starStatus=!this.state.ifCollect   //点击后的状态 false
    var  currentUrl=""
    if(this.state.ifCollect){
        currentUrl=url.curDeletefindWHC//如果true，即调用取消收藏接口

    }else{
        currentUrl=url.curInsertWHC    //如果false，即调用收藏接口
    }
    console.log("当前厅的id"+this.state.prevData.previousId+"用户的id"+getCookie("userId"))

    postReqLogin(currentUrl, {
        collectionId:this.state.prevData.previousId,
        clientUserId:getCookie("userId"),
        type:"C-PSY"
            }).then(resp=> {
                    console.log("去收藏或者取消收藏的数据",resp)

                    if(resp.data){
                        this.setState({
                            colletImg:"../assets/img/icon_star.png",
                            ifCollect:resp.data
                        })
                    }else{
                        this.setState({
                            colletImg:"../assets/img/icon_collect.png",
                            ifCollect:resp.data
                        
                        })
                    }
                    
        
     });


  }
/*****************10/8 mini弹窗隐藏***************/  
hide = () => {
    this.setState({
    visible2: false,
    });
}
/*****************10/8 mini跳转到登录***************/           

goLogin = () => {
this.setState({
visible2: false,
});
this.props.history.push("/Login");
}    


      onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
      }
      onChangeTelName = (e) => {
        this.setState({ telNum: e.target.value });
      }
      
    //   弹窗的显示
      showModal = () => {
        this.setState({
          visible: true,
          userName:"",
          telNum:""
        });
      }
 /************ 表单提交***************** */
    // 点击提交时候的按钮
      handleOk = (e) => {
        var telValue=this.state.telNum;
        if(!telValue){
            Toast.info('手机号码不能为空', 1);
            return
        }
        if(!isPoneAvailable(telValue)){
            Toast.info('请输入正确的手机号码', 1);
            return
        }

        
        postRequest(url.waaInertWebAppData, {
            name:this.state.userName ,
            phone :this.state.telNum,
            type:"婚纱礼服"
                }).then(resp=> {
                        console.log("提交表单打印的数据",resp.data.msg)
                        this.setState({
                            visible: false,
                        });
                        Toast.info(resp.data.msg, 1);
            
         });
        

        function isPoneAvailable(str) {
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(str)) {
                return false;
            } else {
                return true;
            }
        }

      }

      
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

/************ 上面是表单提交***************** */    
      componentDidMount(){
          console.log("传过来的数据",this.state.prevData.content1,this.state.prevData.content2,this.state.prevData.content3,this.state.prevData.content4,this.state.prevData.content5)
        postRequest(url.waaWAfindAllPictureById, {
            id:this.state.prevData.previousId
                }).then(resp=> {
                        console.log("详情打印的数据",resp.data)
                        this.setState({
                            detailList:resp.data.data.findAll
                        
                        })
            
         });
         postRequest(url.waaWAfindWeddingHotelMenuById, {
            id:this.state.prevData.previousId
                }).then(resp=> {
                        console.log("菜单打印的数据",resp.data)
                        this.setState({
                            menueList:resp.data.data.findAll
                        
                        })
            
         });
/*****************10/8 显示用户是否收藏***************/  
if(getCookie("token")){
    postReqLogin(url.curCheckWHC, {
        collectionId:this.state.prevData.previousId,
        clientUserId:getCookie("userId"),
        type:"C-PSY"


            }).then(resp=> {
                    console.log("是否搜藏的数据",resp)

                    if(resp.data){
                        this.setState({
                            colletImg:"../assets/img/icon_star.png",
                            ifCollect:resp.data
                        })
                    }else{
                        this.setState({
                            colletImg:"../assets/img/icon_collect.png",
                            ifCollect:resp.data
                        
                        })
                    }
                    
        
     });
}         
      }


      
  render(){
    const { userName } = this.state;
    const { telNum } = this.state;

    var length=this.state.prevData.content4;
    var listStar=[];
    for(let i=0;i<length;i++){
        listStar.push("1")
    }

    const tabs = [
        
        { title: "摄影详情"},

        
      ];
/*****************10/8 min弹窗的内容***************/        
const popovers=
<div>
    <a onClick={this.hide}>取消</a>
    <a onClick={this.goLogin.bind(this)} style={{marginLeft:"1rem"}}>跳转到登录</a>
</div>



    return (
        <div className="weFourDetail1">
            <div style={{ height:'0rem'}}>

            </div>
            <div style={{ flex: '1',overflowY:"auto"}}>
            <div className="weFourDetail1-head" style={{backgroundImage: `url(${this.state.prevData.qiniu+this.state.prevData.imgUrl})`}}>
                <p className="public-back" onClick={()=>{history.go(-1)}}>
                    <img src={"../assets/img/icon_back.png"}/>
                </p>
                <div className="weFourDetail1-content">
                    <p>{this.state.prevData.name}</p>
                    <div className="star-line">
                        <ul>
                            {
                            listStar.map((item,index)=>{
                                return (
                                    <li key={index}><img src="../assets/img/icon_star.png"/></li>
                                )
                            })
                            }
                    
                        </ul>
                        
                    </div>

                    <p className="weFourDetail1-content-p1">
                        所在城市：{this.state.prevData.content1}
                    </p>
                    <p className="weFourDetail1-content-p1">
                        作品分类：{this.state.prevData.content5}
                    </p>
                    <p className="weFourDetail1-content-p1">
                        摄影介绍：{this.state.prevData.content2}
                    </p>


                   
                </div>
            </div>

            <div className="weFourDetail1-intr">
                <Tabs tabs={tabs}
                initialPage={0}
                swipeable={false}
                
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',width: '9.25rem' ,overflow: 'hidden'}}>
                    <ul className="weFourDetail1-intr1">
                        
                          {
                            this.state.detailList.map((item,index)=>{
                                return (
                                    <li key={item.id}>
                                       <img src={this.state.prevData.qiniu+item.pictureKey}/>
                                    </li>
                                )
                            })
                            }
                        
                    </ul>
                </div>
                

                </Tabs>
               

            </div>
            </div>
            {/* 底部 */}
            <div className="detail-foot">
            <ul>
                <li style={{opacity:"0"}}>
                    <img src="../assets/img/icon_share.png"/>
                    <span>分享</span>
                </li>
                <li style={{ fontSize:"0.4rem" }}>
                    
                    <Popover
                        content={popovers}
                        title="登录后才可收藏"
                        style={{
                            
                        }}
                        trigger="click"
                        visible={this.state.visible2}
                        onVisibleChange={this.handleVisibleChange}
                    >   
                        <div style={{display:"flex",  flexDirection: "column",border:"1px solid #cccccc",marginTop:"-0.1rem"}}>
                            <img style={{display:"flex",justifyContent:"center",width:"0.6rem",marginLeft:"0.35rem",color:"#cccccc"}} src={`${this.state.colletImg}`}/>
                            <span style={{marginTop:"0rem",fontSize:"0.33rem"}}>收藏</span>
                        </div>
                        
                    </Popover>
                </li>
                <li>
                    <img src="../assets/img/icon_service.png"/>
                    <span><a href="tel:18365265404" style={{color:"#666666"}}>客服</a></span>
                </li>
                <li>
                    <Button  onClick={this.showModal} style={{width:"100%",height:"100%", background: "#9b64f8",color:"white",borderColor:"#9b64f8"}}>
                       预约看厅
                    </Button>
                </li>
            </ul>
        </div>
        <div>
            <Modal
                title={null}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={null}
                // closable={false}
                style={{marginTop:"-1rem"}}
                visible={this.state.visible}
                
                onCancel={this.handleCancel}
                >
                <div >
                <p style={{
                    textAlign:"center"
                }}>预约看厅信息填写</p>
                <Input
                    style={{ marginTop:"0.5rem"  }}
                    placeholder="请输入您的姓名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    onChange={this.onChangeUserName}
                    value={userName}
                    
                   
                />
                <Input
                    style={{ marginTop:"0.5rem"  }}
                    placeholder="请输入您的手机号码"
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={this.onChangeTelName}
                    value={telNum}
                    
                    
                />

                <Button type="primary" onClick={this.handleOk}  style={{width:"100%",height:"0.93rem",margin:"0 auto",textAlign:"center",marginTop:"0.5rem" }}>
                    确定
                </Button>
                </div>
            </Modal>
        </div>
        
       
    </div>
)
}
}