import React,{Component} from 'react';
import {postRequest,getRequest} from '../utils/api';
import url from '../utils/url';
import '../assets/css/registerHotel.css';
import {Toast } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
export default class Login extends Component{
	constructor(props) {
    super(props);
    this.state = {
				username: '',
				usercity:"",
				userhotel:"",
				password: '',
				passwordAgain: '',
				};

		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleChange3 = this.handleChange3.bind(this);
		this.handleChange4 = this.handleChange4.bind(this);
		this.handleChange5 = this.handleChange5.bind(this);
	}
	handleChange1(event) {
		this.setState({username: event.target.value});
	}
	handleChange2(event) {
		this.setState({password: event.target.value});
 	}
 	handleChange3(event) {
	this.setState({passwordAgain: event.target.value});
	}
	handleChange4(event) {
		this.setState({usercity: event.target.value});
	}
	handleChange5(event) {
		this.setState({userhotel: event.target.value});
	}		
	
	toLogin(){
		console.log("点击了")
		let usernameV=this.state.username
		let usercityV=this.state.usercity
		let userhotelV=this.state.userhotel
		let passwordV=this.state.password
		let passwordAgainV=this.state.passwordAgain
		
		if(!usernameV){
			Toast.info('账号不能为空', 1);
			return
		}
		if(!usercityV){
			Toast.info('城市不能为空', 1);
			return
		}
		if(!userhotelV){
			Toast.info('酒店不能为空', 1);
			return
		}
		if(!passwordV || !passwordAgainV){
			Toast.info('密码不能为空', 1);
			return
		}

		if(!isPoneAvailable(usernameV)){
			Toast.info('请输入正确的账号', 1);
			return
		}

		if(!isPassword(passwordV) || !isPassword(passwordAgainV)){
			Toast.info('密码必须是字母和数字（长度为6-10位）', 2);
			return
		}
		if(passwordV != passwordAgainV){
			Toast.info('两次输入的密码不一致，请重新输入', 1);
			return
		}

		postRequest(url.waaInsertClientUser, {
			city:usercityV,
			hotelName:userhotelV,
			username:usernameV ,
			password:passwordV,
			
					}).then(resp=> {
						console.log("提交表单打印的数据",resp.data)
						// this.props.history.push("/Login");
						Toast.info(resp.data.msg, 1);
						var that=this
						if(resp.data.status=="200"){
							setTimeout(function(){
								that.props.history.push("/Login");
							},1000)
							
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

		<div className="login2">
			<div className="content2">
			<div className="header-bg2">
			<div className="back-login2">
			<img src="../assets/img/icon_back.png" onClick={()=>{history.go(-1)}}  style={{width:"0.6rem",height:"0.4rem",marginLeft:"0.3rem"}}/>
			</div>
			<div className="header-logo2" >
				<img src="../assets/img/logo.png"  style={{marginLeft:"4.2rem",width:"1.5rem",height:"1.8rem",marginTop:"1.6rem"}}/>
			</div>


			<div className="formData2">

			<div className="account2">
				<img src="../assets/img/account_login.png"/><input type="text" style={{width:"7rem"}} value={this.state.username} placeholder="账号必须为手机号码" className="account-put" onChange={this.handleChange1} />
			</div>


			<div className="city2">
			<img src="../assets/img/account_login.png"/><input type="text" style={{width:"7rem"}} value={this.state.usercity} placeholder="请输入您所在的城市" className="account-put" onChange={this.handleChange4} />
			</div>

			<div className="hotel2">
			<img src="../assets/img/account_login.png"/><input type="text" style={{width:"7rem"}} value={this.state.userhotel} placeholder="请输入您的酒店" className="account-put" onChange={this.handleChange5} />
			</div>

			<div className="password2">
				<img src="../assets/img/pw_login.png"/><input type="password" style={{width:"7rem"}} value={this.state.password} placeholder="请输入您的密码"  className="password-put" onChange={this.handleChange2} />
			</div>
			<div className="password2">
				<img src="../assets/img/pw_login.png"/><input type="password" value={this.state.passwordAgain} placeholder="请再次输入密码"  className="password-put" onChange={this.handleChange3} />
			</div>
				<div className="else" style={{display:"none"}}>
					<span className="forgetPass2">忘记密码</span>
					<span className="register2">注册</span>
				</div>
			</div>

			</div>
			</div>
			<div className="login-clu6">
			<button className="loginSubmit6" onClick={this.toLogin.bind(this)}>酒店会员注册</button>
			</div>

		</div>
 		

        </React.Fragment>
				
      )

    }
    
    }