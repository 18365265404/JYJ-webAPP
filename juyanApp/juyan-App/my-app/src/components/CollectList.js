import React,{Component} from 'react';
import '../assets/css/collectList.css';

import querystring from 'query-string';
import {postRequest,getRequest,postReqLogin} from '../utils/api';
import { Toast} from 'antd-mobile';
import url from '../utils/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Select, Checkbox,Button} from 'antd';
import { getCookie } from '../utils/utils';



const CheckboxGroup = Checkbox.Group;

const plainOptions = [{name:"苹果",id:"1"}, {name:"香蕉",id:"2"}, {name:"梨子",id:"3"}];
// const defaultCheckedList = [{name:"苹果"}];


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
      allIdLIst:["1","2","3"],

      detailPath:""
    }

  };
  
  goDetail(type){
    console.log("显示的是什么",type)
      console.log("点击了")
      if(type=="C-YHT"){
        this.props.history.push("/WePictureDetail");
        //   console.log("显示的是什么",type)
        //     this.setState({
        //         detailPath:"WePictureDetail"
        //     })
      }
  }
  componentDidMount(){
    const _this=this;
    postReqLogin(url.curFindAllWHCByUserId, {
        id:getCookie("userId")
    }).then(resp=> {
            console.log("打印的数据",resp.data)
            var changeList=resp.data.data.findAll.list
            console.log()
            
            for(let i=0;i<changeList.length;i++){
                switch (changeList[i].collectionType) {

                  case "C-YHT"://宴会厅
                  changeList[i].collectionType="WeHotelDetail"
                  
                  break;

                  case "C-CH"://婚礼策划
                  changeList[i].collectionType="WedSchemeDetail"
                  break;

                  case "C-SY"://司仪
                  changeList[i].collectionType="WeFourDetail1"
                  break;
                  case "C-GZ"://跟妆
                  changeList[i].collectionType="WeFourDetail2"   
                  break;
                  
                  case "C-PSY"://摄影
                  changeList[i].collectionType="WeFourDetail3"     
                  break;
                  
                  case "C-SX"://摄像
                  changeList[i].collectionType="WeFourDetail4"   
                  break;

                  case  "C-HSZ"://婚纱照
                  changeList[i].collectionType="WePictureDetail"
                  break;

                  case "C-HY"://花艺
                  changeList[i].collectionType="WeFlowerDetail"
                  break;
                  
                  
                  
                  
                  case "C-LF"://礼服
                  changeList[i].collectionType="weFulldressDetail"
                
                  break;

                  
                
                  default:
                    break;
                }
            }
            console.log("改变后的list",changeList)


            _this.setState({
              list:changeList,
              firstList:resp.data.data.findAll.list,
              qiNiuUrl:resp.data.data.qiniu,
              pages:resp.data.data.findAll.pages
            })
            if(resp.data.data.findAll.list.length==0){
                this.setState({
                    noDataStyle:"block"
                })
            }else{
                this.setState({
                    noDataStyle:"none"
                })
            }
            if(resp.data.data.findAll.pages==1){
                this.setState({
                    loadMoreStyle:"none"
                })
            }else{
                this.setState({
                    loadMoreStyle:"block"
                })
            }
            
            let currentList=resp.data.data.findAll.list;
            let arrId=[]
            for(let i=0; i<currentList.length;i++){
                arrId.push(currentList[i].id)
            }
            // this.setState({
            //     allIdLIst:arrId
            // })

            console.log("所有的Id",arrId )
            

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
      postReqLogin(url.waaWAfindAllWeddingPictures, {
        style:this.state.style,
        prices:this.state.prices,
        pageNum: that.state.currentPage, 
      }).then(resp=> {
              console.log("加载更多打印的数据",resp.data)
              that.setState({
                list: that.state.list.concat(
                  resp.data.data.findAll.list
                ),
                // pages:resp.data.data.findAll.pages
              })

              if(resp.data.data.findAll.list.length==0){
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

    deleBtn(index,id,types){
      var curentType=""
      switch (types) {
        case "WeHotelDetail"://宴会厅
        curentType="C-YHT"
        
        break;

        case "WedSchemeDetail"://婚礼策划  
        curentType="C-CH" 
     
        break;

        case "WeFourDetail1"://司仪
        curentType="C-SY" 
     
        break;
        case "WeFourDetail2"://跟妆
        curentType="C-GZ" 
       
        break;
        
        case "WeFourDetail3"://摄影
        curentType="C-PSY"
    
        break;
        
        case "WeFourDetail4"://摄像
        curentType="C-SX"
         
        break;

        case  "WePictureDetail"://婚纱照
        curentType="C-HSZ"
        
        break;

        case "WeFlowerDetail"://花艺
        curentType="C-HY"

        break;
        
        
        
        
        case "weFulldressDetail"://礼服
        curentType="C-LF"

        break;
        default:
          break;
      }
      console.log("删除了")
      console.log(id,curentType)
     
      postReqLogin(url.curDeletefind, {
        collectionId:id,
        clientUserId:getCookie("userId"),
        type:curentType
            }).then(resp=> {
                    console.log("删除一条后的数据",resp.data)
                    var changeList=resp.data.data.findAll.list
                    console.log()
                    Toast.info('删除成功', 1);
                    if(changeList.length==0){
                      this.setState({
                        noDataStyle:"block"
                    })
                    }else{
                      this.setState({
                        noDataStyle:"none"
                    })
                    }
                    for(let i=0;i<changeList.length;i++){
                        switch (changeList[i].collectionType) {
        
                          case "C-YHT"://宴会厅
                          changeList[i].collectionType="WeHotelDetail"
                          
                          break;
        
                          case "C-CH"://婚礼策划
                          changeList[i].collectionType="WedSchemeDetail"
                          break;
        
                          case "C-SY"://司仪
                          changeList[i].collectionType="WeFourDetail1"
                          break;
                          case "C-GZ"://跟妆
                          changeList[i].collectionType="WeFourDetail2"   
                          break;
                          
                          case "C-PSY"://摄影
                          changeList[i].collectionType="WeFourDetail3"     
                          break;
                          
                          case "C-SX"://摄像
                          changeList[i].collectionType="WeFourDetail4"   
                          break;
        
                          case  "C-HSZ"://婚纱照
                          changeList[i].collectionType="WePictureDetail"
                          break;
        
                          case "C-HY"://花艺
                          changeList[i].collectionType="WeFlowerDetail"
                          break;
                          
                          
                          
                          
                          case "C-LF"://礼服
                          changeList[i].collectionType="weFulldressDetail"
                        
                          break;
        
                          
                        
                          default:
                            break;
                        }
                    }
                    this.setState({
                        list:changeList
                    
                    })
        
     });
    }
    onChange = (checkedList) => {
        console.log("当前选择的是什么",checkedList)
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
          checkAll: checkedList.length === plainOptions.length,
        });
      }
    
      onCheckAllChange = (e) => {
        this.setState({
          checkedList: e.target.checked ? this.state.allIdLIst : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });

        console.log()
      }
  render(){




      return(
        <div className="collectList" style={{display:"flex",flexDirection:"column"}}>
              <div className="public-title2">
              <p className="public-back2" onClick={()=>{history.go(-1)}}>
                   <img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem"}}/>
               </p>
               <span>我的收藏</span>
               <a style={{opacity:"0"}}>
                     <img  src="../assets/img/icon_search.png" />
               </a>

             </div>
            
          <div style={{flex:"1",overflowY: "auto"}}>
            <div className="collectList-content-list" >
                <div className="noDataShow" style={{display:this.state.noDataStyle}}>
                    <p >暂无数据...</p> 
                </div>
              
            
              {/* 列表 */}
              <ul className="collectList-list">
            {
                  this.state.list.map((item,index)=>{
                      return(
                        <li key={item.id}>

                      <p style={{fontSize:"0.32rem",margin:"0 0.2rem",paddingTop:"0.2rem"}}>
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
                        <span  style={{}}>
                          <span style={{color:"red",display:"flex",justifyContent:"space-between",lineHeight:"0.5rem"}}>{item.price ? item.price : ""}{item.prices ? item.prices : ""}{item.price ? "元" : ""}{item.prices ? "元"  : ""}&nbsp;
                          <Button onClick={this.deleBtn.bind(this,index,item.id,item.collectionType)} type="success" style={{ height:"0.6rem",marginRight:"0.2rem",marginTop:'-0.5rem'}}>删除</Button>
                          </span>
                         
                        </span>
                        
                        </p>
                          <p style={{fontSize:"0.32rem",margin:"0 0.2rem"}}>{item.describe}</p>
                        <Link to={`/${item.collectionType}/`+item.id
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
                          
                        
                          <img src={this.state.qiNiuUrl+item.pictureKey} style={{borderRadius:"0.2rem"}}/>
                        </Link>
                        </li>
                      )
                  })

                }
                 <div style={{display:this.state.loadMoreStyle}} className="loadMore" ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>加载更多</div>
              </ul>
            </div>  
            </div>

        </div>
      )

  }

}