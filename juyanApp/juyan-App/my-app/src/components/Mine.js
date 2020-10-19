import React,{Component} from 'react';
import url from '../utils/url';
import {getCookie,setCookie, delCookie} from '../utils/utils';
import {postRequest,getRequest,postReqLogin} from '../utils/api';
import { Tabs, WhiteSpace, Badge,Toast } from 'antd-mobile';
import { Modal, Button ,Input ,Upload, Icon, message  } from 'antd';
import '../assets/css/Mine.css';


export default class Mine extends Component{
	constructor(props) {
        super(props);
        this.state = {
            username:"",
            pwOld:"",
            pwNew:"",
            visible: false ,
            loading: false,
            imgDie:"block",
            nicknameV:"",
            qiniu:"",
            headImgurl:"",
            headImgFoot:"",
            changePwStyle:"none",
            changeNameStyle:"none",
            informNum:"*",
            newsStatus:"",
            
        };
        }


        onChangePwOld = (e) => {
            this.setState({ pwOld: e.target.value });
          }
        onChangePwNew = (e) => {
            this.setState({ pwNew: e.target.value });
        }
        onChangeNick = (e) => {
            this.setState({ nicknameV: e.target.value });
        }
        
        
          
        //   弹窗的显示
          showModal = (tag) => {
              if(tag=="changePw"){
                this.setState({
                    visible: true,
                    pwOld:"",
                    pwNew:"",
                    changePwStyle:"block",
                    changeNameStyle:"none",

                  });
                
              }
              if(tag=="changeName"){
                this.setState({
                    visible: true,
                    pwOld:"",
                    pwNew:"",
                    changePwStyle:"none",
                    changeNameStyle:"block",

                  });
                
              }
              
            
          }
     /************ 表单提交***************** */
        // 点击提交时候的按钮
          handleOk = (e) => {
            var pwNewValue=this.state.pwNew;
            var pwOldValue=this.state.pwOld;
            if(!pwNewValue || !pwNewValue){
                Toast.info('输入框不能为空', 1);
                return
            }

            if(!isPassword(pwNewValue)){
                Toast.info('密码必须是字母或数字（长度为6-10位）', 2);
                return
            }
        
            // if(pwNewValue!=pwOldValue){
            //     Toast.info('两次输入的密码不一致', 1);
            //     return
            // }
    
            
            postReqLogin(url.curUpdateClientUserPassword, {
                id:getCookie("userId"),
                password :this.state.pwOld ,
                newPassword :this.state.pwNew,
                
                    }).then(resp=> {
                        var that =this
                        if(resp.data.status=="200"){
                            setTimeout(function(){
                                that.props.history.push("/Login");
                            },1000)
                        }
                        
						
					
					Toast.info(resp.data.msg, 1);
                            console.log("提交表单打印的数据",resp.data)
                            this.setState({
                                visible: false,
                            });
                            Toast.info(resp.data.msg, 1);
                
             });
            
    
        // 密码的正则（字母加数字6-10位）
		function isPassword(str) {
			var myreg=/^[a-zA-Z0-9]{6,10}$/;
			if (!myreg.test(str)) {
					return false;
			} else {
					return true;
			}
	    }
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
    
    logOut(){
        console.log("推出登陆")
        postReqLogin(url.curClientloginOut, {
            id:getCookie("userId")
                }).then(resp=> {
                        
                        console.log("个人中心的数据",resp.data)
                        var that =this
                        if(resp.data.status=="200"){
                            delCookie("clientToken")
                            delCookie("userId")
                            setTimeout(function(){
                                that.props.history.push("/Login");
                            },1000)
                        }
					
					Toast.info(resp.data.data, 1);
            
         });
    }
    changeNickname(){
        // if(!this.state.nicknameV){
        //     Toast.info("昵称不能为空", 1);
        //     return
        // }
        postReqLogin(url.curUpdateClientUser, {
            id:getCookie("userId"),
            nickname:this.state.nicknameV
                }).then(resp=> {
                        
                        console.log("修改昵称的数据",resp.data)
                        
                        if(resp.data.status=="200"){
                            Toast.info("修改成功", 1);
                            this.setState({
                                visible: false,
                            });
                        }
					
					
            
         });
    }

    componentDidMount(){
        
        if(!getCookie("clientToken")){
            var  that=this
            setTimeout(function(){
                that.props.history.push("/Login");
            },1000)
            Toast.info("登录失效,请登录", 1);
            return
        }
        
        postReqLogin(url.curFindClientUserById, {
            id:getCookie("userId")
                }).then(resp=> {

                    if(!resp.data){
                        this.setState({
                          
                            reqStatus:false
                                                  
                          })
                          return
                      }
                        console.log("个人中心的数据",resp.data)
                        if(resp.data.status==200){
                            //如果昵称不存在 直接跳转到首页
                            if(!resp.data.data.findAll.nickname){
                                this.props.history.push("/Login");
                                console.log("登录失效")
                                return
                            }
                            this.setState({
                                nicknameV:resp.data.data.findAll.nickname,
                                qiniu:resp.data.data.qiniu,
                                headImgurl:resp.data.data.qiniu + resp.data.data.findAll.pictureKey,
                                headImgFoot:resp.data.data.findAll.pictureKey
                             })
                        }else if(resp.data.status==500){

                            delCookie("clientToken")
                            delCookie("userId")
                            Toast.info(resp.data.msg, 1);
                            this.props.history.push("/Login");
                        }
                        else if(resp.response.status==400){
                            this.props.history.push("/Login");
                            console.log("登录失效")
                            return
                          }
                        
            
         });


         postReqLogin(url.curFindAllIsBoolean, {
            HotelUserId:getCookie("userId")
                }).then(resp=> {

               
                        console.log("是否有新消息的数据",resp.data)
                        this.setState({
                            newsStatus:resp.data
                            
                         })
                        
            
         });     
    }    
    handleChange = (info) => {
        console.log(info,"上传图片过程中的数据")
        if (info.file.status === 'uploading') {
          this.setState({
               loading: true ,
               imgDie:"none"
            });

          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
            imgDie:"block"
          }));
        }
        if(info.file.response.status=="200"){
            console.log("上传成功了",info.file.response.data.findAll.pictureKey)
            this.setState({
                headImgFoot:info.file.response.data.findAll.pictureKey,
                headImgurl:this.state.qiniu + info.file.response.data.findAll.pictureKey
             });
        }

        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
            }  
      }


 
render(){




        function beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
        }

    const { pwOld } = this.state;
    const { pwNew } = this.state;

    const uploadButton = (
        <div>
          <Icon  type={this.state.loading ? 'loading' : 'none'} />
          <div className="ant-upload-text" style={{position:"relative"}}>
             <img src={this.state.headImgFoot ? this.state.headImgurl : "../assets/img/bg_noImg.png" } style={{width:"2.2rem",height:"2.2rem",borderRadius:"0.2rem", position:"absolute",left:"-0.3rem",top:"-1.3rem",display:`${this.state.imgDie}`}}/>
             
          </div>
        </div>
      );
      const imageUrl = this.state.imageUrl;

    return  (
    <React.Fragment>
      <div className="mine">
          <header>
            <p className="" style={{display:"flex",height:"1.17rem", width:"6rem",margin:"0.2rem"}} onClick={()=>{this.props.history.push("/Home");}}>
               <img src={"../assets/img/icon_back.png"} style={{width:"0.6rem",height:"0.4rem"}}/>
               <span style={{fontSize:"0.4rem",lineHeight:"1rem",opacity:"0"}}>返回首页</span>
            </p>
            <div className="mine-detail1">
            <div >
            <Upload
                
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${url.serverUrl}${url.curUpdateClientUser}?id=${getCookie("userId")}&clientToken=${getCookie("clientToken")}`}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? uploadButton : uploadButton}
            </Upload>
            </div>
                
                <div className="mine-detail1-content">
                    <p style={{display:"flex",paddingRight:"0.2rem"}}>
                        {this.state.nicknameV}
                        <span onClick={this.showModal.bind(this,"changeName")} style={{color:"#333333",fontWeight:"normal"}}> (可编辑)</span>
                    </p>
                    <span style={{display:"none"}}>请设置您的婚期</span>
                </div>
            </div>
          </header>
          <div className="mine-content">
                <ul>
                    <li style={{display:"none"}}><img src="../assets/img/icon_calendar.png"/> <span>结婚吉日<img src="../assets/img/icon_right.png"/></span></li>
                    <li style={{display:"none"}}><img src="../assets/img/icon_helper.png"/> <span>结婚助手<img src="../assets/img/icon_right.png"/></span></li>
                    <li onClick={this.showModal.bind(this,"changePw")} ><Icon type="diff" style={{marginTop:"0.3rem",fontSize:"0.6rem"}} /> <span>修改密码<img src="../assets/img/icon_right.png"/></span></li>
                    <li onClick={this.logOut.bind(this)} ><Icon style={{marginTop:"0.3rem",fontSize:"0.6rem"}} type="snippets" /> <span>退出登陆<img src="../assets/img/icon_right.png"/></span></li>
                </ul>

                <div className="mine-content-last" onClick={()=>{this.props.history.push("/CollectList");}}><Icon type="ordered-list" style={{marginTop:"0.3rem",fontSize:"0.6rem"}} /> <span>我的收藏<img src="../assets/img/icon_right.png"/></span></div>
                
                <div className="mine-content-last" style={{display:`${getCookie("hotelName") ? '' :'none'}` ,  marginTop:"0.2rem"}} onClick={()=>{this.props.history.push("/MessageList");}}><Icon type="book" style={{marginTop:"0.3rem",fontSize:"0.6rem"}} /> <span ><span style={{display:"flex",width:"2rem"}}>消息通知 <span style={{ display:`${this.state.newsStatus ? "none" : "block"}`,height:"0.5rem",width:"0.5rem" ,marginTop:"0.3rem",lineHeight:"100%",textAlign:"center",color:"white", border:"1px solid red",borderRadius:"50%", background:"red"}}>{this.state.informNum}</span></span><img src="../assets/img/icon_right.png"/></span></div>
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
                    
                    {/* 弹窗修改密码的部分 */}
                    <div style={{ display:`${this.state.changePwStyle}`}}>
                        <p style={{
                            textAlign:"center"
                        }}>修改密码信息</p>
                        <Input
                            style={{ marginTop:"0.5rem"  }}
                            placeholder="请输入您的旧密码"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                            onChange={this.onChangePwOld}
                            value={pwOld}
                            
                        
                        />
                        <Input
                            style={{ marginTop:"0.5rem"  }}
                            placeholder="请输入您的新密码"
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.onChangePwNew}
                            value={pwNew}  
                        />

                        <Button type="primary" onClick={this.handleOk}  style={{width:"100%",height:"0.93rem",margin:"0 auto",textAlign:"center",marginTop:"0.5rem" }}>
                            确定
                        </Button>
                    </div>
                    
                    {/* 弹窗修改昵称的部分 */}
                    <div style={{ display:`${this.state.changeNameStyle}`}}>
                        <p style={{
                            textAlign:"center"
                        }}>修改昵称</p>
                        <Input
                            style={{ marginTop:"0.5rem"  }}
                            placeholder="请输入昵称"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                            onChange={this.onChangeNick}
                            value={this.state.nicknameV}
                            
                        
                        />
                        

                        <Button type="primary" onClick={this.changeNickname.bind(this)}  style={{width:"100%",height:"0.93rem",margin:"0 auto",textAlign:"center",marginTop:"0.5rem" }}>
                            确定
                        </Button>
                    </div>
                    
                    </div>
                </Modal>
            </div>



            
      </div>

    </React.Fragment>

    )
}


}