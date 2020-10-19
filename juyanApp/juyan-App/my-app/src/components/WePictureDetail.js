import React,{Component} from 'react';
import '../assets/css/wePictureDetail.css';
import querystring from 'query-string';
import { Select } from 'antd';
import {postRequest,getRequest,postReqLogin} from '../utils/api';  //不同的请求
import url from '../utils/url';
import { Tabs, WhiteSpace, Badge,Toast } from 'antd-mobile';
import { Modal, Button ,Input ,Icon ,Popover} from 'antd';      //antd UI
import {getCookie,setCookie} from '../utils/utils';             //获取cookie
export default class WePictureDetail extends Component{

    constructor(props){
        super(props);
        this.state= {
            prevData:{
                name:querystring.parse(props.location.search).title,
                qiniu:querystring.parse(props.location.search).qiniu,
                imgUrl:querystring.parse(props.location.search).imgUrl,
                previousId:this.props.match.params.id,
                city:querystring.parse(props.location.search).city,
                modelling:querystring.parse(props.location.search).modelling,
                starLevel:querystring.parse(props.location.search).starLevel,
                team:querystring.parse(props.location.search).team,
                truing:querystring.parse(props.location.search).truing,
                shoot:querystring.parse(props.location.search).shoot,


                
            },
            userName: '', //表单提交的名字
            telNum: '',//表单提交的手机
            state :{ visible: false },
            detailList:[],
            menueList:[],
            colletImg:"../assets/img/icon_collect.png", /*****************10/8 收藏图标颜色***************/  
            ifCollect: false, /*****************10/8 判断是否收藏***************/

            
        };
       

        console.log(this.props.match.params.id,"传过来的id")
        

        
      }
          
/*****************10/8 收藏点击***************/  
handleVisibleChange = (visible2) => {
    if(!getCookie("clientToken")){
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
        type:"C-HSZ"
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
        postRequest(url.waaWAfindAllPictureById, {
            id:this.state.prevData.previousId
                }).then(resp=> {
                        console.log("详情打印的数据",resp.data.data.findAll)
                        let  curentList=resp.data.data.findAll
                        for( let i=0;i<curentList.length;i++){
                                curentList[i]["tail"] = curentList[i].pictureKey.split(".")[1]
                                if(curentList[i].tail=="bmp" || curentList[i].tail=="jpeg" ||
                                 curentList[i].tail=="gif" || curentList[i].tail=="psd" 
                                || curentList[i].tail=="png" || curentList[i].tail=="tiff" 
                                || curentList[i].tail=="jpg")
                                {
                                    curentList[i]["tail"]=true
                                }else{
                                    curentList[i]["tail"]=false
                                }
                        }
                        console.log("详情打印的数据22222",curentList)
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
        if(getCookie("clientToken")){
            postReqLogin(url.curCheckWHC, {
                collectionId:this.state.prevData.previousId,
                clientUserId:getCookie("userId"),
                type:"C-HSZ"
    
    
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

    var length=this.state.prevData.starLevel;
    var listStar=[];
    for(let i=0;i<length;i++){
        listStar.push("1")
    }

    const tabs = [
        
        { title: "作品展示"},
        
        
      ];
 /*****************10/8 min弹窗的内容***************/        
 const popovers=
 <div>
     <a onClick={this.hide}>取消</a>
     <a onClick={this.goLogin.bind(this)} style={{marginLeft:"1rem"}}>跳转到登录</a>
 </div>     


    return (
        <div className="wePictureDetail">
            <div style={{ height:'0rem'}}>

            </div>
            <div style={{ flex: '1',overflowY:"auto"}}>
            <div className="wePictureDetail-head" style={{backgroundImage: `url(${this.state.prevData.qiniu+this.state.prevData.imgUrl})`}}>
                <p className="public-back2" onClick={()=>{history.go(-1)}}>
                    <img src={"../assets/img/icon_back.png"}  style={{width:"0.6rem",height:"0.4rem"}}/>
                </p>
                <div className="wePictureDetail-content" style={{overflowY:"auto"}}>
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
                    <p className="wePictureDetail-content-p1">
                        所在城市：{this.state.prevData.city}
                    </p>
                    <p className="wePictureDetail-content-p1">
                        造型：{this.state.prevData.modelling}
                    </p>
                    <p className="wePictureDetail-content-p1">
                        拍摄：{this.state.prevData.shoot}
                    </p>
                    <p className="wePictureDetail-content-p1">
                        精修：{this.state.prevData.truing}
                    </p>
                    <p style={{display:"none"}} className="wePictureDetail-content-p1">
                        团队：{this.state.prevData.team}
                    </p>


                   
                </div>
            </div>

            <div className="wePictureDetail-intr">
                <Tabs tabs={tabs}
                initialPage={0}
                swipeable={false}
                
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',width: '9.25rem' ,overflow: 'hidden'}}>
                    <ul className="wePictureDetail-intr1">
                        
                          {
                            this.state.detailList.map((item,index)=>{
                                return (
                                    <li key={item.id}>
                                       <img style={{display: item.tail ? "block" : "none"  }} src={this.state.prevData.qiniu+item.pictureKey}/>
                                       <video style={{width:"9rem",height:"5rem",marginLeft:"0.2rem",display: item.tail ? "none" : "block"  }} src={this.state.prevData.qiniu+item.pictureKey} controls="controls">
                                            您的浏览器不支持 video 标签。
                                     </video>
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
            <ul style={{width:"8rem",marginLeft:"1rem"}}>
                <li style={{display:"none"}}>
                    <img src="../assets/img/icon_share.png"/>
                    <span>分享</span>
                </li>
                <li style={{ fontSize:"0.4rem" ,marginLeft:"2rem"}}>
                    
                    <Popover
                        content={popovers}
                        title="登录后才可收藏"
                        style={{
                            
                        }}
                        trigger="click"
                        visible={this.state.visible2}
                        onVisibleChange={this.handleVisibleChange}
                    >   
                        <div style={{display:"flex",  flexDirection: "column",marginTop:"0rem"}}>
                            <img style={{display:"flex",justifyContent:"center",width:"0.6rem",marginLeft:"0.15rem",color:"#cccccc"}} src={`${this.state.colletImg}`}/>
                            <span style={{marginTop:"0rem",fontSize:"0.33rem"}}>收藏</span>
                        </div>
                        
                    </Popover>
                </li>
                <li style={{marginLeft:"2rem"}}>
                    <img src="../assets/img/icon_service.png"/>
                    <span style={{marginTop:"0.04rem"}}><a href="tel:400-8551-520" style={{color:"#666666"}}>客服</a></span>
                </li>
                <li style={{opacity:"0"}}>
                    <Button   style={{width:"100%",height:"100%", background: "#9b64f8",color:"white",borderColor:"#9b64f8"}}>
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