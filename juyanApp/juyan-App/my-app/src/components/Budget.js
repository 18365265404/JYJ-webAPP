import React,{Component} from 'react';
import { Toast} from 'antd-mobile';
import '../assets/css/budget.css';
import { Carousel } from 'antd';
import {getCookie,setCookie} from '../utils/utils';
import {postRequest,getRequest,postReqLogin,postRequestNocity} from '../utils/api';
import url from '../utils/url';
export default class Budget extends Component{

    constructor(props){
        super(props);
        this.state =({

          formList1:['浦东区','闵行区','宝山区','华南区'],
          formList2:['不限','2000以下','2000-3000','3000-4000','4000-5000','5000-6000'],
          formList3:['10桌以下','10-20桌','20-30桌','30-40桌','40桌上'],

          form:{
            position:'',
            money:'2000以下',
            tableNum:'10桌以下',
    
          },
          chooseIndex:'0'

        })

      }
  render(){
    return (
      <div className='budget'>
        <div className='budget-head'>
            <img onClick={()=>{history.go(-1)}} src="../assets/img/icon-leftjt.png" style={{width:"0.6rem",height:"0.4rem"}}/>
            <img src='../assets/img/logo8.png'/>
            <div></div>
        </div>  
        <Carousel afterChange={onChange}>
            <div className='banner-item'>
                <h3>1</h3>
            </div>
            <div className='banner-item'>
                <h3>2</h3>
            </div>
            <div className='banner-item'>
                <h3>3</h3>
            </div>
            <div className='banner-item'>
                <h3>4</h3>
            </div>
        </Carousel>
        <div className='ad'>
            <img src='http://www.ygghunyan.com/html/zt1/imgs/kban1.jpg'/>
            {/* <img style={{'width':'0.8rem',"height":'0.8rem'}} src='../assets/img/icon_riqi.png' alt="暂无图片"/> */}
        </div>
        <ul className='budget-tab'>
            <li>
                <img src='http://www.ygghunyan.com/html/zt1/imgs/lico1.png' />
                <h1 style={{"color":'#0096ff'}}>超低价</h1>
                <h2>比线下场地门店价格节省10%~20%</h2>
            </li>
            <li>
                <img src='http://www.ygghunyan.com/html/zt1/imgs/kico2.png' />
                <h1 style={{"color":'#E72017'}}>更轻松</h1>
                <h2>专业顾问1对1帮您找场地10分钟快速响应</h2>
            </li>
            <li>
                <img src='http://www.ygghunyan.com/html/zt1/imgs/kico3.png' />
                <h1 style={{"color":'#E200F6'}}>更优惠</h1>
                <h2>快速获取厦门百家酒店最新优惠</h2>
            </li>
            <li>
                <img src='http://www.ygghunyan.com/html/zt1/imgs/kico4.png' />
                <h1 style={{"color":'#000000'}}>更直接</h1>
                <h2>超过10000+场地档期查询宴格格不向客户收取任何费用</h2>
            </li>
        </ul>
        <div style={{background:'white',height:"2rem"}}>
            <a className='btn' href="tel:400-8551-520">
                <div className='img-box'>
                    <img src='../assets/img/icon_tel.png'/>
                </div>
                <div className='btn-text'>
                    <span>点击拨打客服热线</span>
                    <span>400-8551-520</span>
                </div>
            </a>
        </div>

        <ul className='formBudget'>
            <img src='http://www.ygghunyan.com/html/zt1/imgs/qimgs1.jpg'/>
            <li className='item'>
                <h1>请选择酒席区域</h1>
                
                <div className='item-choose' onClick={this.chooseform.bind(this,"1")}>
                    <span className='item-choose-text'>{this.state.form.position}</span>
                    <div className='meceng'>

                    </div>
                </div>
                {
                    this.state.chooseIndex==1?(
                        <div className='choose_list'>
                        {
                            this.state.formList1.map((item,index)=>{
                            return <h2 key={index}  onClick={this.getChooseVal.bind(this,'1',item)}>{item}</h2>
                            
                            })
                        }
    
    
                    </div> 
                    ):null
                }

            </li>
            <li className='item'>
                <h1>请选择餐标</h1>
                
                <div className='item-choose' onClick={this.chooseform.bind(this,"2")}>
                    <span className='item-choose-text'>{this.state.form.money}</span>
                    <div className='meceng'>
                            
                    </div>
                </div>
                {
                    this.state.chooseIndex==2?(
                        <div className='choose_list'>
                        {
                            this.state.formList2.map((item,index)=>{
                            return <h2 key={index}  onClick={this.getChooseVal.bind(this,'2',item)}>{item}</h2>
                            
                            })
                        }
    
    
                    </div> 
                    ):null
                }

            </li>
            <li className='item'>
                <h1>请选择桌数</h1>
                <div className='item-choose' onClick={this.chooseform.bind(this,"3")}>
                    <span className='item-choose-text'>{this.state.form.tableNum}</span>
                    <div className='meceng'>
                            
                    </div>
                </div>
                {
                    this.state.chooseIndex==3?(
                        <div className='choose_list'>
                        {
                            this.state.formList3.map((item,index)=>{
                            return <h2 key={index}  onClick={this.getChooseVal.bind(this,'3',item)}>{item}</h2>
                            
                            })
                        }
    
    
                    </div> 
                    ):null
                }

            </li>
            <li className='item'>
                <h1>联系电话</h1>
                <div className='item-choose' >
                    <div>
                        <input ref='formTel' onChange={()=>this.inputChange()} style={{}} type='text' placeholder='请输入您的手机号码'/>
                    </div>
                    
                </div>
                

            </li>

            <div onClick={this.nowLook.bind(this,this.state.form)} style={{"marginTop":"0.5rem", "color":"white", "fontSize":'0.4rem',"textAlign":'center',"lineHeight":'1.2rem', "height":"1.2rem",'width':'9.4rem',"background":'#e72019',"marginLeft":"0.3rem","borderRadius":'0.1rem'}}>
                提交需求
            </div>
            
        </ul>
     </div>
        
      
    )
  }
// input获取数据
  inputChange(){

    let val=this.refs.formTel.value;
    this.state.form.tel=val
  }  

//表单提交
nowLook(obj){

    

    if(!isPoneAvailable(obj.tel)){
        Toast.info('请输入正确的手机号码', 1);
        return
    }


    postRequest(url.reservedInformationInsertReservedInformation, {
        area:this.state.form.position,
        weddingDay:this.state.form.date,
        tablesNum:this.state.form.tableNum,
        mealStandard:this.state.form.money,
        phone:this.state.form.tel
    }).then(resp=> {
        console.log("111111111111111",resp.data.data)
            if(resp.data.data==1){
                Toast.info('提交成功', 1);
            }else{
                Toast.info(resp.data.data, 1);
            }

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
// // 选择form的select值
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
hideAllMenu=(e)=>{

    let classA=e.target.className
    let classB=e.target.parentNode.className
    console.log('target',classA)
    if(classA!='meceng'){
        this.setState({
            chooseIndex:'0'
        })
        
    }

    
}

//生命周期开始的时候调用 
componentDidMount(){
    document.addEventListener('click', this.hideAllMenu);


    var cookieCity=getCookie("city");

    // 根据第一个select选择查询二级城市
    postRequest(url.waaWAfindAllCounties, {
        cityName:cookieCity
    }).then(resp=> {
        console.log("111111111111111",resp.data.data)
        let arr=[]
        resp.data.data.forEach((v,i) => {
            arr.push(v.countiesName)
        });
        this.state.formList1=arr
        console.log("33333333333",arr[0])

        this.setState({
            form:{
                position:arr[0],
                money:'2000以下',
                tableNum:'10桌以下',
            }
        })
        
    });
}

}

/******************方法***********************************************************/ 
function onChange(a, b, c) {
    console.log(a, b, c);
}






