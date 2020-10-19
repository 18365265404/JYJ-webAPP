import React,{Component} from 'react';
import '../assets/css/home.css';
// import Slider from './Slider'
import {List} from './List'
import {connect} from "react-redux";
import asyncAction from '../store/asyncAction'
import ReactSwipe from 'react-swipe';


import { Toast} from 'antd-mobile';
// import {Link} from 'react-router-dom';
import Background from '../assets/img/phone.png';
import {postRequest,getRequest,postReqLogin,postRequestNocity} from '../utils/api';
import { Popover,Modal,Carousel ,Input, Select, Icon ,DatePicker,Button } from 'antd';
import {getCookie,setCookie} from '../utils/utils';
import url from '../utils/url';
import {Link,NavLink} from 'react-router-dom';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class Home extends Component{
  constructor(props){
    super(props);
    this.state =({
      list:[{name:"宴会酒店",id:"1",img:"../assets/img/home_tab_yht.png",title:"WeHotel"},
            {name:"策划搭建",id:"2",img:"../assets/img/home_tab_ch.png",title:"WedScheme"},
            // {name:"四大金刚",id:"3",img:"../assets/img/home_tab_sdjg.png",title:"WeFour"},
            // {name:"婚纱照",id:"4",img:"../assets/img/home_tab_hsz.png",title:"WePicture"},
            // {name:"婚礼花艺",id:"5",img:"../assets/img/home_tab_hy.png",title:"WeFlower"},
            // {name:"新娘说",id:"6",img:"../assets/img/home_tab_xls.png"},
            // {name:"婚纱礼服",id:"7",img:"../assets/img/home_tab_lf.png",title:"WeFulldress"}
            {name:"摄影旅拍",id:"3",img:"../assets/img/home_tab_hsz.png",title:"WePicture"},
            {name:"婚礼用品",id:"4",img:"../assets/img/home_tab_hy.png",title:"WeFlower"}
          ],
      cityList:[], 
      selectList1:[],
      selectList2:[],   
      selectList3:[{name:"婚宴",id:"1"},{name:"宝宝宴",id:"2"},{name:"生日宴",id:"3"},{name:"商务活动",id:"4"}],   
      selectList4:[{name:"0-10桌",id:"1"},{name:"10-20桌",id:"2"},{name:"20-30桌",id:"3"},{name:"30桌以上",id:"4"}], 
      listBanner:[],  
      newShopList:[],    
      noDataStyle:"none",
      loadMoreStyle:"block",
      qiNiuUrl:"",   
      currentPage:"1",
      currentCity:""  ,
      headUrl:"" ,
      reqStatus:true,
      headfoot:true,
      userName: '', //表单提交的名字
      telNum: '',//表单提交的手机
      cityOne: '',
      hotelKind:"",
      tableNumber:"",
      cityTwo:[],
      // positionCity:"",
      // countryCity:["加拿大","博瑞啦"],
      clearStatus:false,
      chooseTime:moment(`${moment().format('YYYY-MM')}`, 'YYYY-MM')._i,
    })
    // let url=`/data/index.data`;
    // props.get(url);//获取home数据
  }
//  给城市赋值
    hide = (city) => {


      console.log(city,"切换赋值的城市111111111111")
      setCookie("city",city,10000000)
      this.setState({
        visible: false,
        currentCity:city
      });

          // 查询所有城市
          postRequest(url.waaWAfindAllCity, {
            
                }).then(resp=> {
                        console.log("查询所有城市打印的数据",resp.data.data.list)
                        
                        this.setState({
                          cityList:resp.data.data.list,
                          
                        })
            
                    });
    
      // banner图
        postRequest(url.waaWAfindAllAppBanner, {
          
        }).then(resp=> {
                console.log("打印的数据",resp.data)
                this.setState({
                  listBanner:resp.data.data.findAll.list,
                  qiNiuUrl:resp.data.data.qiniu
                })
    
        });

    // 新品上架
    postRequest(url.waaWAfindAllNew, {
      
    }).then(resp=> {
            console.log("新品上架打印的数据",resp.data)

            let changeList=resp.data.data

            
            for(let i=0;i<changeList.length;i++){
                switch (changeList[i].serailNumber) {

                  case "C-YHT"://宴会厅
                  changeList[i].serailNumber="WeHotelDetail"
                  
                  break;

                  case "C-CH"://婚礼策划
                  changeList[i].serailNumber="WedSchemeDetail"
                  break;

                  case "C-SY"://司仪
                  changeList[i].serailNumber="WeFourDetail1"
                  break;
                  case "C-GZ"://跟妆
                  changeList[i].serailNumber="WeFourDetail2"   
                  break;
                  
                  case "C-PSY"://摄影
                  changeList[i].serailNumber="WeFourDetail3"     
                  break;
                  
                  case "C-SX"://摄像
                  changeList[i].serailNumber="WeFourDetail4"   
                  break;

                  case  "C-HSZ"://婚纱照
                  changeList[i].serailNumber="WePictureDetail"
                  break;

                  case "C-HY"://花艺
                  changeList[i].serailNumber="WeFlowerDetail"
                  break;
                  
                  
                  
                  
                  case "C-LF"://礼服
                  changeList[i].serailNumber="weFulldressDetail"
                
                  break;

                  
                
                  default:
                    break;
                }
            }
            console.log("改变后的list",changeList)



            this.setState({
              newShopList: changeList,
             
            })

    });
    }

    handleVisibleChange = (visible) => {
      this.setState({ visible });
    }




//生命周期开始的时候调用 
componentDidMount(){
  {

 
  

/*通过百度地图获取当前位置城市信息*/
 var BMap = window.BMap;//取出window中的BMap对象
 var myCity = new BMap.LocalCity();
 let WeatherLists = {};
 let _this=this
 myCity.get(function (result) {
 console.log("查询定位当前的城市121111111111",result.name);          //城市名称


 

 var pamasCity=""
 var positionCity =result.name
//  positionCity="东京市"
console.log("当前定位的城市",positionCity)

 var cookieCity=getCookie("city");
 console.log("当前cookie城市",cookieCity)



 var ifPosition=true
 
 if(cookieCity){  //如果有城市Cookie，则参数城市为Cookie城市

  ifPosition=false  //如果有cookie城市，定位就不使用
  pamasCity=cookieCity
  selectAboutCIty(cookieCity)
  console.log("有cookie666666666666666666666666666666",cookieCity)
  _this.setState({
     currentCity:cookieCity     
   })
 }else{           //如果没有城市Cookie，则参数城市为定位城市城市

  console.log("没cookie0000000000000000000000000000000000000000000000000000000000000000",cookieCity)
  ifPosition=true  //如果有cookie城市，定位正常使用
  pamasCity="上海市"  //默认的城市
  selectAboutCIty(pamasCity)
  setCookie("city",pamasCity)
  _this.setState({
    currentCity:pamasCity
    
  })
 }




     // 查询所有城市
    
     postRequestNocity(url.waaWAfindAllCity, {
      
      }).then(resp=> {
              console.log("生命周期 查询所有城市打印的数据",resp.data.data.list);
              
              _this.setState({
                cityList:resp.data.data.list,
                
                
              })
              let allCity=resp.data.data.list


              //只在第一次打开页面时候会调用，因为没有cookie城市记录着
              if(ifPosition){
                


                for(let i= 0 ;i<allCity.length;i++){   //如果当前定位的城市是存在的，则覆盖默认城市  如果定位城市不存在，则是继续之前的默认城市
                  if(allCity[i].cityName==positionCity){
                    
                    pamasCity=positionCity 
                    setCookie("city",pamasCity)
                    console.log("11111111111111111111111111",pamasCity)
                    _this.setState({
                      currentCity:pamasCity
                      
                    })

                    selectAboutCIty(pamasCity)
                  }
              }


            }
              
              


  
          });








function selectAboutCIty(pamasCity){





  // banner图
  postRequestNocity(url.waaWAfindAllAppBanner, {
    keyword:pamasCity
  }).then(resp=> {
          console.log("banner打印的数据",resp.data)
          _this.setState({
            listBanner:resp.data.data.findAll.list,
            qiNiuUrl:resp.data.data.qiniu
          })

  });

  // 新品上架
  postRequestNocity(url.waaWAfindAllNew, {
    keyword :pamasCity
    
  }).then(resp=> {
          console.log("新品上架打印的数据",resp.data)

          let changeList=resp.data.data

          
          for(let i=0;i<changeList.length;i++){
              switch (changeList[i].serailNumber) {

                case "C-YHT"://宴会厅
                changeList[i].serailNumber="WeHotelDetail"
                
                break;

                case "C-CH"://婚礼策划
                changeList[i].serailNumber="WedSchemeDetail"
                break;

                case "C-SY"://司仪
                changeList[i].serailNumber="WeFourDetail1"
                break;
                case "C-GZ"://跟妆
                changeList[i].serailNumber="WeFourDetail2"   
                break;
                
                case "C-PSY"://摄影
                changeList[i].serailNumber="WeFourDetail3"     
                break;
                
                case "C-SX"://摄像
                changeList[i].serailNumber="WeFourDetail4"   
                break;

                case  "C-HSZ"://婚纱照
                changeList[i].serailNumber="WePictureDetail"
                break;

                case "C-HY"://花艺
                changeList[i].serailNumber="WeFlowerDetail"
                break;
                
                
                
                
                case "C-LF"://礼服
                changeList[i].serailNumber="weFulldressDetail"
              
                break;

                
              
                default:
                  break;
              }
          }
          console.log("改变后的list",changeList)



          _this.setState({
            newShopList: changeList,
           
          })

  });

}







            
 });

}
      


 if(getCookie("userId")){
   
  // 查询头像是否存在
  postReqLogin(url.curFindClientUserPictureById, {
    id:getCookie("userId")
}).then(resp=> {
  console.log("sdfsdfsdfsdfsdfsdfsdfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",resp.response)
        if(!resp.data){
          if(resp.response.status==400){
            this.setState({
              headfoot:false,
              reqStatus:false
              
            })
            console.log("登录失效··········································")
            return
          }
        }
        console.log("查询首页头像数据",resp.data)
        console.log("查询首页头像数据URL",resp.status)
        
        if(resp.data.status==200){
          this.setState({
            headUrl:resp.data.data.qiniu+ resp.data.data.findAll,
            reqStatus:true
            
          })
          if(resp.data.data.findAll==undefined){
            
            this.setState({
                  headfoot:false,
                  reqStatus:true
                                      
                 })
                
          }

          return
        }
        
        

    }
  );
}else{
this.setState({
  headfoot:false,
  reqStatus:false
                        
})
}

            








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





onChangeUserName = (e) => {
  this.setState({ userName: e.target.value });
}
onChangeTelName = (e) => {
  this.setState({ telNum: e.target.value });
}

//   弹窗的显示
showModal = () => {
  if(!getCookie("clientToken")){
    
    Toast.info("请您先登录",1)
    setTimeout(() => {
      this.props.history.push('/Login') 
    }, 1300);
    this.setState({
      visible2: false,

    })
    return
}

  console.log(this.state.chooseTime)
//表单提交先清空表单数据

this.setState({
  visible2: true,
  userName:"",
  telNum:"",
  cityOne:"",
  cityTwo:[],
  hotelKind:"",
  tableNumber:"",
  // chooseTime:""
})



      // 弹窗查询所有城市
      postRequest(url.waaWAfindAllCity, {
        
        }).then(resp=> {
                console.log("查询所有城市打印的数据",resp.data.data.list)
                this.setState({
                  selectList1:resp.data.data.list,
                  
                })
    
            });

}    

/************ 表单提交***************** */
// 点击提交时候的按钮
handleOk = (e) => {


  console.log("表单内的数据 ",1111111,this.state.userName,22222222,this.state.telNum,333333,this.state.hotelKind,"000000000",this.state.tableNumber,4444444,this.state.chooseTime,555555,this.state.cityOne,66666,this.state.cityTwo)
  

var telValue=this.state.telNum;
if(!telValue){
    Toast.info('手机号码不能为空', 1);
    return
}
if(!isPoneAvailable(telValue)){
    Toast.info('请输入正确的手机号码', 1);
    return
}
if(!this.state.hotelKind || !this.state.tableNumber|| !this.state.chooseTime || !this.state.cityOne){
    Toast.info("表单内容不能为空",1)
    return 
}
if(this.state.cityTwo.length==0){
  Toast.info("表单内容不能为空",1)
  return
}


postReqLogin(url.curWAinsertRecommend, {
  
    recommendId:getCookie("userId"),
    name:this.state.userName ,
    phone :this.state.telNum,
    tableNumber:this.state.tableNumber,
    banquetType : this.state.hotelKind,
    banquetTime : this.state.chooseTime,
    city : this.state.cityOne,
    counties : this.state.cityTwo,

        }).then(resp=> {
                console.log("提交表单打印的数据",resp.data.msg)
                this.setState({
                    visible2: false,
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
  visible2: false,
});
}

/************ 上面是表单提交***************** */  





    // --------------------------加载更多------------------------------
      loadMoreDataFn(that) {

      that.state.currentPage++;
      if(that.state.currentPage> 3){
        Toast.info('没有更多了', 1);
        
        return
      }
      postRequest(url.waaWAfindAllNew, {

        pageNum: that.state.currentPage, 
      }).then(resp=> {
        console.log("加载更多新品上架打印的数据",resp.data)
        
                    let changeList=resp.data.data
        
                    
                    for(let i=0;i<changeList.length;i++){
                        switch (changeList[i].serailNumber) {
        
                          case "C-YHT"://宴会厅
                          changeList[i].serailNumber="WeHotelDetail"
                          
                          break;
        
                          case "C-CH"://婚礼策划
                          changeList[i].serailNumber="WedSchemeDetail"
                          break;
        
                          case "C-SY"://司仪
                          changeList[i].serailNumber="WeFourDetail1"
                          break;
                          case "C-GZ"://跟妆
                          changeList[i].serailNumber="WeFourDetail2"   
                          break;
                          
                          case "C-PSY"://摄影
                          changeList[i].serailNumber="WeFourDetail3"     
                          break;
                          
                          case "C-SX"://摄像
                          changeList[i].serailNumber="WeFourDetail4"   
                          break;
        
                          case  "C-HSZ"://婚纱照
                          changeList[i].serailNumber="WePictureDetail"
                          break;
        
                          case "C-HY"://花艺
                          changeList[i].serailNumber="WeFlowerDetail"
                          break;
                          
                          
                          
                          
                          case "C-LF"://礼服
                          changeList[i].serailNumber="weFulldressDetail"
                        
                          break;
        
                          
                        
                          default:
                            break;
                        }
                    }
                    console.log("加载更多改变后的changeList",changeList)
        
        
        
                    this.setState({
                      newShopList: this.state.newShopList.concat(
                        changeList
                      ),
                      // pages:resp.data.data.findAll.pages
                    })
        
           
            if(resp.data.data==0){
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

    // POP弹窗内的东西
    const Option = Select.Option;
    const Search = Input.Search;
    let {homeData}=this.props;

    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    
    //第一个select事件
    function handleChange1(value) {
        console.log(value,"选择的城市")
        this.setState({
          cityOne : value
        })


    if(this.state.cityTwo.length!=0){
      console.log("触发了当前的select已经选择的城市")
      this.setState({
        cityTwo:[]
      })
    }    
    // 根据第一个select选择查询二级城市
    postRequest(url.waaWAfindAllCounties, {
          cityName:value
      }).then(resp=> {
              console.log("select2打印的数据",resp.data)

              this.setState({
                selectList2:resp.data.data
              })
  
            
  
      });
       
  

    }
    //第二个select事件
    function handleChange2(value) {
        console.log(value,"第二个城市选择")
        this.setState({
          cityTwo : value
        })
            
    }
    //第三个select事件
    function handleChange3(value) {
        console.log(value,"宴会厅选择")
        this.setState({
          hotelKind : value
        })
            
    }

        //第四个select事件
        function handleChange4(value) {
          console.log(value,"宴会厅选择")
          this.setState({
            tableNumber : value
          })
              
      }

    

    function onChangeTime(date, dateString) {

        this.setState({
            chooseTime:dateString
        })

    }
    // 上面城市POP弹窗内的东西

    const content = (
      
      <ul className="home-cityList" >
        
      {
         this.state.cityList.map((item,index)=>{
          return (
           
             
             <li key={item.id} onClick={this.hide.bind(this, item.cityName)}><h5>{item.cityName}</h5></li>
          )
        })
      }

      </ul>
     
    );

    //电话点击的弹出的内容
    const content2 = (
      <div style={{fontSize:"0.3rem"}}>
          <p style={{width:"1.5rem",height:"1.5rem",borderRadius:"50%",background:"#EEF6FC",textAlign:"center",lineHeight:"1.5rem"}}><a style={{color:"black"}} href="tel:400-8551-520">客服电话</a></p>
          <p style={{width:"1.5rem",height:"1.5rem",borderRadius:"50%",background:"#EEF6FC",textAlign:"center",lineHeight:"1.5rem"}}><a style={{color:"black"}} href="http://p.qiao.baidu.com/cps/chat?siteId=12777208&userId=26759148">网络客服</a></p>
      </div>
          
    );

    return (
      <React.Fragment>
            <div className="home" style={{display:"flex",flexDirection:"column"}}>
            {/* 头部搜索*/}
              <div className="home-head">
                <div className="header">
                
               
                    <div className="header-center">
                        <Popover content={content} 
                        placement="bottomLeft"
                        trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                        >
                            <span style={{}} >{this.state.currentCity}</span><img className="header-center-img" src="../assets/img/icon_down.png" />
                        </Popover>
                      
                    </div>
                    
                    <Link to={`/${this.state.reqStatus ? "Mine" : "Login"}/` } >
                      <div>
                        <span style={{color:'white',fontSize:"0.3rem",lineHeight:'1.5rem',marginRight:'0.1rem'}} ></span><img className="head-headImg"  src={this.state.headfoot ? this.state.headUrl : "../assets/img/bg_noImg.png"  } alt=""/>
                      </div>
                    </Link>
                   
                      
                    
                   
                </div>
                </div>  
              <div style={{flex:"1",overflowY: "auto"}}>
                
              {/* 轮播图 */}

              <Carousel autoplay>
              {
                  this.state.listBanner.map((item,index)=>{
                    return (
                     
                       <div key={item.id} className="banner" style={{}}><img src={this.state.qiNiuUrl+item.appPictures} alt=""/> </div>
                    )
                  })
                }

              </Carousel>
              {/* <ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:1000}}>
              
             
              </ReactSwipe> */}

              {/* tab按钮 */}

                 
              <ul className="home-tab">

                {
                  this.state.list.map((item,index)=>{
                    return (
                      <li key={item.id}>
                        <Link to={"/"+item.title+"/"+item.id+"?title="+item.name}>
                          <img src={item.img} alt="暂无图片"/>
                          <span>{item.name}</span>
                        </Link>
                       
                      </li>
                    )
                  })
                }


               
              </ul>

              {/* 服务承诺 */}

              <div className="home-server">
                <p style={{marginBottom:"0.3rem"}}>服务承诺</p>
                <ul className="home-server-content">
                  <li><img src="../assets/img/home-server1.png" alt=""/></li>
                  <li><img src="../assets/img/home-server2.png" alt=""/></li>
                  <li><img src="../assets/img/home-server3.png" alt=""/></li>
                  <li><img src="../assets/img/home-server4.png" alt=""/></li>
                </ul>

              </div>

              {/* 新品上架 */}

              <div className="home-goods">
                <p style={{marginBottom:"0.3rem"}}>新品上架</p>
                <ul className="home-goods-content">
                {
                  this.state.newShopList.map((item,index)=>{
                    return (
                      
                      <li key={item.id}>
                          <p style={{fontSize:"0.37rem"}}>
                            {  item.schemeHeadline ? item.schemeHeadline : ""}
                            {  item.weddingName ? item.weddingName : ""}
                            {  item.makeupName ? item.makeupName : ""}
                            {item.emceeName ? item.emceeName : ""}
                            {item.cameraName ? item.cameraName : ""}
                            {item.photographyName ? item.photographyName : ""}
                            {item.weddingName ? item.weddingName : ""}
                          
                            {item.weddingHeadline ? item.weddingHeadline : ""}
                            
                            {item.weddingPicturesName ? item.weddingPicturesName : ""} 
                            {item.fullDressName ? item.fullDressName : ""} 
                          </p>
                          <p style={{fontSize:"0.32rem"}}>{item.describe}</p>

                          <Link to={`/${item.serailNumber}/`+item.id
                        +`?title=

                        ${  item.schemeHeadline ? item.schemeHeadline : ""}
                        ${  item.weddingName ? item.weddingName : ""}
                        ${  item.makeupName ? item.makeupName : ""}
                        ${item.emceeName ? item.emceeName : ""}
                        ${item.cameraName ? item.cameraName : ""}
                        ${item.photographyName ? item.photographyName : ""}
                        ${item.weddingName ? item.weddingName : ""}
                       
                        ${item.weddingHeadline ? item.weddingHeadline : ""}
                        ${item.weddingPicturesName ? item.weddingPicturesName : ""}
                        `
                        
                        
                        +"&qiniu="+this.state.qiNiuUrl
                        +"&imgUrl="+item.pictureKey
                        +"&city="+item.city
                        +`&classify=${  item.classify ? item.classify : ""}`
                        +"&describe="+item.describe
                        +`&prices=${  item.prices ? item.prices : ""}`
                        +`&starLevel=${  item.starLevel ? item.starLevel : ""}`
                        +"&style="+item.style
                       
                        +`&content1=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.city ? item.city : ""}`//城市
                        +`&content2=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.introduce ? item.introduce : ""}`
                        +`&content3=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.prices ? item.prices : ""}`
                        +`&content4=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.starred ? item.starred : ""}`
                        +`&content5=${  item.classify ? item.classify : ""}${item.style ? item.style : ""}`

                        +`&address=${item.address ? item.address : ""}`
                        +`&identifying=${item.identifying ? item.identifying : ""}`
                        

                      
                        +"&activity="+item.activity
                      
                      
                        +"&describe2="+item.describe2
                        +"&describe3="+item.describe3
                        +"&hotelType="+item.hotelType
                        +"&price="+item.price
                        +"&severalTimes="+item.severalTimes
                        +"&starredHotel="+item.starredHotel
                        +"&tableNumber="+item.tableNumber
                       
                       
                       
                        
                        +"&modelling="+item.modelling
                        +"&starLevel="+item.starLevel
                        +"&team="+item.team
                        +"&truing="+item.truing
                        +"&shoot="+item.shoot
                     
                        }>
                          <img src={this.state.qiNiuUrl+item.pictureKey} style={{borderRadius:"0.2rem"}} />
                        </Link>  
                      </li>
                    )
                  })
                }
                  
                 
                </ul>
                <div style={{display:"none",textAlign:"center"}} className="loadMore" ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>加载更多</div>

              
              </div>
              <div className="home-drag" style={{backgroundImage: `url(${Background})`}}>
                {/* <a href="tel:400-8551-520"></a> */}
                <Popover placement="left"  content={content2} trigger="click">
                <Button style={{opacity:"0"}}>Left</Button>
              </Popover>
              </div>
              {/* <div className="home-drag2" style={{background:"#9a6cfc"}} onClick={()=>{this.props.history.push("/Questionnaire");}} >
                <a >问卷</a>
              </div> */}
              <div onClick={this.showModal} className="home-drag3" style={{background:"#9a6cfc"}} >
                <a className="home-custer">推荐</a>
              </div>
              </div>  


              <div>
                <Modal
                    title={null}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    // closable={false}
                    style={{marginTop:"-1rem"}}
                    visible={this.state.visible2}
                    
                    onCancel={this.handleCancel}
                    >
                    <div >
                    <p style={{
                        textAlign:"center"
                    }}>推荐客户</p>

              <ul>
                <li>
                <span style={{marginBottom:"0rem"}}>请输入客户的姓名:</span> <br/>
                <Input
                        style={{ marginTop:"0.15rem"  }}
                        placeholder="请输入客户的姓名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                        onChange={this.onChangeUserName}
                        value={this.state.userName}
                        size="small"
                      
                    />
                </li>

                <li style={{marginTop:"0.3rem"}}>
                <span style={{marginBottom:"0rem"}}>请输入客户的手机号码:</span> <br/>
                <Input
                        style={{ marginTop:"0.15rem"  }}
                        placeholder="请输入客户的手机号码"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeTelName}
                        value={this.state.telNum}
                        
                        size="small"
                    />
                </li>

              
                   
                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择城市：</span><br/>
                    
                    <Select
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="城市"
                        value={this.state.cityOne}
                        optionFilterProp="children"
                        onChange={handleChange1.bind(this)}
                        size="small"
                        >
                            {
                            this.state.selectList1.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.cityName}  key={item.id}>{item.cityName}</Option>
                                )
                            })
                            }

                    </Select>
                </li>

                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择区/县：</span> <br/>
                    <Select
                        mode="multiple"
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="区/县"
                        optionFilterProp="children"
                        value={this.state.cityTwo}
                        onChange={handleChange2.bind(this)}
                        // defaultValue={this.state.countryCity}
                        // allowClear={this.state.clearStatus}
                        // autoClearSearchValue={this.state.clearStatus}
                        
                        size="small"
                        >
                            {
                            this.state.selectList2.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.countiesName}  key={item.id}>{item.countiesName}</Option>
                                )
                            })
                            }

                    </Select>
                </li>

                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选宴会类型：</span> <br/>
                    <Select
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="类型"
                        optionFilterProp="children"
                        value={this.state.hotelKind}
                        onChange={handleChange3.bind(this)}
                        size="small"
                        >
                            {
                            this.state.selectList3.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.name}  key={item.id}>{item.name}</Option>
                                )
                            })
                            }

                    </Select>
                </li>
                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选桌数：</span> <br/>
                    <Select
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="类型"
                        optionFilterProp="children"
                        value={this.state.tableNumber}
                        onChange={handleChange4.bind(this)}
                        size="small"
                        >
                            {
                            this.state.selectList4.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.name}  key={item.id}>{item.name}</Option>
                                )
                            })
                            }

                    </Select>
                </li>

                <li style={{marginTop:"0.3rem"}}>
                    
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择客户宴会的需求时间：</span> 
                    <br/>

                   
                    <MonthPicker defaultValue={moment(`${moment().format('YYYY-MM')}`, 'YYYY-MM')}  placeholder="选择年月" onChange={onChangeTime.bind(this)} style={{ width: "100%"}}/>
                    {/* <DatePicker  defaultValue={moment(`${moment().format('YYYY-MM-DD')}`, 'YYYY-MM-DD')} /> */}
                </li>
                </ul>
  
                    <Button type="primary" onClick={this.handleOk}  style={{width:"100%",height:"0.93rem",margin:"0 auto",textAlign:"center",marginTop:"0.5rem" }}>
                        确认提交
                    </Button>
                    </div>
                </Modal>
            </div>
        
            </div>
            
            
      </React.Fragment>
    )
  }
  componentWillMount(){
    this.props.clear()
  }
}

const mapStateToProps = state => ({
  homeData:state.homeData
});
const mapDispatchToProps = dispatch => ({
  get:(url)=>{dispatch(asyncAction(dispatch,url,'UPDATE_HOME_DATA'))},
  clear:()=>{dispatch({type:'CLEAR_HOME_DATA'})}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
