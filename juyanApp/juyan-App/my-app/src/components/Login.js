import React,{Component} from 'react';
import {postRequest,getRequest} from '../utils/api';
import url from '../utils/url';
import '../assets/css/login.css';
import {Link,NavLink} from 'react-router-dom';
import {Toast } from 'antd-mobile';
import {getCookie,setCookie,delCookie} from '../utils/utils';
export default class Login extends Component{
	constructor(props) {
    super(props);
    this.state = {
				username: '',
				password: '',

				};

		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
	}
	handleChange1(event) {
		this.setState({username: event.target.value});
	}
	handleChange2(event) {
		this.setState({password: event.target.value});
  }
  toLogin(){
	console.log("点击了")
	let usernameV=this.state.username
	let passwordV=this.state.password

	
	if(!usernameV){
		Toast.info('姓名不能为空', 1);
		return
	}
	if(!passwordV){
		Toast.info('密码不能为空', 1);
		return
	}

	if(!isPoneAvailable(usernameV)){
		Toast.info('请输入正确的账号', 1);
		return
	}

	if(!isPassword(passwordV)){
		Toast.info('密码必须是字母或数字（长度为6-10位）', 2);
		return
	}


	postRequest(url.waaClientLogin, {
		username:usernameV ,
		password:passwordV,
		
				}).then(resp=> {
					console.log("点击登陆后的数据",resp.data)
					// this.props.history.push("/Mine");
					if(resp.data.status=="200"){
						
						// setCookie("username",resp.data.data.username)
						// setCookie("city",resp.data.data.city)
						// setCookie("hotel",resp.data.data.hotelName)
						setCookie("userId",resp.data.data.id)
						setCookie("clientToken",resp.data.data.clientToken)
						if(resp.data.data.hotelName){
							setCookie("hotelName",resp.data.data.hotelName)
						}else{
							delCookie("hotelName")
						}
						
						var that=this
						setTimeout(function(){
							that.props.history.push("/Home");
						},1000)
						Toast.info("登录成功", 1);
						
					}else{
						Toast.info(resp.data.msg, 1);
					}
					
					
		
 });
	// 验证手机的正则
	function isPoneAvailable(str) {
		var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
		if (!myreg.test(str)) {
				return false;
		} else {
				return true;
		}
}
// 密码的正则（字母加数字6-10位）
		function isPassword(str) {
			var myreg=/^[a-zA-Z0-9]{6,10}$/;
			if (!myreg.test(str)) {
					return false;
			} else {
					return true;
			}
	}

}


    render(){

    return (
        <React.Fragment>

		<div className="login">
			<div className="content">
			<div className="header-bg">
			<div onClick={()=>{this.props.history.push("/Home");}} className="back-login">
			<img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem"}}/>
			</div>
			<div className="header-logo" >
				<img src="../assets/img/logo.png"  style={{marginLeft:"3.8rem",width:"2.5rem",height:"2.8rem",marginTop:"1.6rem"}}/>
			</div>

			<div className="formData">
			<div className="account">
			<img src="../assets/img/account_login.png"/><input type="text" style={{width:"7rem"}} value={this.state.username} placeholder="账号必须为手机号码" className="account-put" onChange={this.handleChange1} />
		</div>
		<div className="password">
			<img src="../assets/img/pw_login.png"/><input type="password" style={{width:"7rem"}} value={this.state.password} placeholder="请输入密码"  className="password-put" onChange={this.handleChange2} />
		</div>
				<div className="else">
					<span className="forgetPass"><a href="tel:400-8551-520">忘记密码(点击联系客服)</a></span>
					
				</div>
			</div>

			</div>
			</div>
			<div className="login-clu">
			<button className="loginSubmit" onClick={this.toLogin.bind(this)}>登 录</button>
			</div>
			<div className="login-clu">
			<button className="loginSubmit2" onClick={()=>{this.props.history.push("/Register");}}>普通会员注册</button>
			</div>

			<div className="login-clu">
			<button className="loginSubmit3" onClick={()=>{this.props.history.push("/RegisterHotel");}}>酒店会员注册</button>
			</div>
		</div>
 		

        </React.Fragment>
				
      )

    }
    
    }