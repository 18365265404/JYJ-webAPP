import React,{Component} from 'react';
import { Toast} from 'antd-mobile';
import '../assets/css/gift.css';
import { Carousel } from 'antd';
import {getCookie,setCookie} from '../utils/utils';
import {postRequest,getRequest,postReqLogin,postRequestNocity} from '../utils/api';
import url from '../utils/url';

export default class Gift extends Component{

    constructor(props){
        super(props);
        this.state =({

            tel:""

        })

      }
  render(){
    return (
      <div className='gift'>
        <div className='gift-head'>
            <img onClick={()=>{history.go(-1)}} src="../assets/img/icon-leftjt.png" style={{width:"0.6rem",height:"0.4rem"}}/>
            <img src='../assets/img/logo8.png'/>
            <div></div>
        </div>  
        <div className='gift-img'>
            <img src='http://www.ygghunyan.com/resource/wap/images/lxbaner.jpg'/>
        </div>
        <div className='gift-content'>
            <div className='gift-detail'>
                <h1>尊享</h1>
                <h2>获取百家酒店场地婚宴菜单</h2>
                <h2>获取百家心仪场地具体详情</h2>
                <h2>获取近期婚宴场地空挡日期</h2>
            </div>
            <div className='gift-titel'>
                预留手机号
            </div>
            <div className='gift-ipt'>
                <input ref='formTel' onChange={()=>this.inputChange()} style={{}} type='text' placeholder='请输入您的手机号码'/>
            </div>
            <div onClick={this.nowLook.bind(this,this.state.tel)} style={{"marginTop":"0.5rem", "color":"white", "fontSize":'0.4rem',"textAlign":'center',"lineHeight":'1.2rem', "height":"1.2rem",'width':'9rem',"background":'#e72019',"marginLeft":"0.5rem","borderRadius":'0.1rem'}}>
                提交需求
            </div>
        </div>

     </div>

        
      
    )
  }

// input获取数据
inputChange(){

    let val=this.refs.formTel.value;
    this.state.tel=val
}  

//表单提交
nowLook(){

    console.log('222222222',this.state.tel)
    let  tels=this.state.tel
    if(!isPoneAvailable(tels)){
        Toast.info('请输入正确的手机号码', 1);
        return
    }

    function isPoneAvailable(str) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    postRequest(url.reservedInformationInsertReservedInformation, {
        area:"",
        weddingDay:"",
        tablesNum:"",
        mealStandard:"",
        phone:this.state.tel
    }).then(resp=> {
    console.log("111111111111111",resp.data.data)
        if(resp.data.data==1){
            Toast.info('提交成功', 1);
        }else{
            Toast.info(resp.data.data, 1);
        }

    });    

}  
// 选择form的select值
getChooseVal(index,val){
    console.log("选择form的select值",index)
    switch (index) {
    case '1':
        
        this.state.form.position=val

        break;
    case '2':
        this.state.form.money=val
        break;
    case '3':
        this.state.form.tableNum=val

        break;
  
    default:
        break;
    }
}  
  // 选择下拉框
chooseform=(index,e)=>{
    // alert(index)
    let cIndex=this.state.chooseIndex
    if(cIndex==index){
        this.setState({
        chooseIndex:'0'
        })
        return
    }
    this.setState({
        chooseIndex:index
    })

}


//生命周期开始的时候调用 
componentDidMount(){

}

}

/******************方法***********************************************************/ 
function onChange(a, b, c) {
    console.log(a, b, c);
}






