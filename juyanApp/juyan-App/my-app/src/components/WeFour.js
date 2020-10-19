import React,{Component} from 'react';
import '../assets/css/weFour.css';
import querystring from 'query-string';
import {postRequest,getRequest} from '../utils/api';
import { Toast} from 'antd-mobile';
import url from '../utils/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import {getCookie,setCookie} from '../utils/utils';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';


export default class weFour extends Component{

  constructor(props){
    super(props);
    this.state={
      name:querystring.parse(props.location.search).title,
      qiNiuUrl:"",
      list:[],
      refreshing: false,
      down: true,
      currentPage:"1",
      pageNum:"",
      height: document.documentElement.clientHeight,
      data: [],
      pubCurrentUrl:"",//点击时候切换的列表切换地址
      detailPaths:"WeFourDetail1",//点击列表跳转的路径
      prices:"",
      style:"",
      noDataStyle:"none",
      loadMoreStyle:"block",
      
      pages:"",//总页数,

      
    }

  };

  componentDidMount(){


    var curentCookie= getCookie("tabNum");
    console.log("获取的cookie值",curentCookie)
    var currentUr=url.waaWAfindAllEmcee
    if(curentCookie){

        switch (curentCookie) {
            case "0":
            console.log("记录的位置为00000000000000000000000000",curentCookie)
            currentUr=url.waaWAfindAllEmcee

            break;
            
            case "1":
            console.log("记录的位置为111111111111111111",curentCookie)
            currentUr=url.waaWAfindAllMakeup

            break;
           
            case "2":
            console.log("记录的位置为22222222222222222222",curentCookie)
            currentUr=url.waaWAfindAllCamera

            break;

            case "3":
            currentUr=url.waaWAfindAllPhotography
            

            break;
        
            default:
                break;
        }

    }
    const _this=this;
    postRequest(currentUr, {
        
    }).then(resp=> {
            console.log("打印的数据",resp.data)
            _this.setState({
              list:resp.data.data.findAll.list,
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
      let currentUrls=this.state.pubCurrentUrl; //加载更多时候的url
    //   首次进入页面的时候url是为空的，如果为空，加载更多时候就调用第一个页面的数据
      if(currentUrls==""){
        currentUrls=url.waaWAfindAllEmcee
      }
      postRequest(currentUrls, {
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

      
    //   console.log("当前的页数",that.state.currentPage);
    //   if(that.state.currentPage>3){
    //     Toast.info('没有更多了', 1);
        
    //   }else{

    //   }
      

    }
  render(){

    const tabs = [
        
        { title: "司仪"},
        { title: "跟妆"},
        { title: "摄影"},
        { title: "摄像"},
        
      ];
      function tabClick(tab,index){
            console.log("点击那个tab为",tab,index)
            
            var currentUrl=""
            var detailPath=""
            switch (index) {
                case 0:
                currentUrl=url.waaWAfindAllEmcee
                detailPath="weFourDetail1"
                setCookie("tabNum",0,10000)
                
                    break;
                case 1:
                currentUrl=url.waaWAfindAllMakeup
                detailPath="weFourDetail2"
                setCookie("tabNum",1,10000)
                    break;  
                case 2:
                currentUrl=url.waaWAfindAllCamera
                detailPath="weFourDetail3"
                setCookie("tabNum",2,10000)
                    break;
                case 3:
                currentUrl=url.waaWAfindAllPhotography
                
                detailPath="weFourDetail4"
                setCookie("tabNum",3,10000)
                    break;      
            
                default:
                    break;
            }
            this.setState({
                currentPage:"1",
                pubCurrentUrl:currentUrl,
                detailPaths:detailPath
            })
            postRequest(currentUrl, {
                
            }).then(resp=> {
                    console.log("打印的数据",resp.data)
                    this.setState({
                      list:resp.data.data.findAll.list,
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
        
            });
      }


      return(
        <div className="weFour">
              <div className="public-title">
               <p className="public-back" onClick={()=>{history.go(-1)}}>
                    <img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem"}}/>
                </p>
                <span>{this.state.name}</span>
                <a style={{opacity:"0"}}>
                      <img src="../assets/img/icon_search.png" />
                </a>

              </div>
              <div className="wedSchemeDetail-intr"  style={{ marginTop: "0"}}>
                <Tabs tabs={tabs}
                initialPage={parseInt(getCookie("tabNum"))}
                swipeable={false}
                
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={tabClick.bind(this)}
                >
                <div style={{display:"none"}}>
                    <ul className="wedSchemeDetail-intr1">
                        
                        
                    </ul>
                </div>
                

                </Tabs>
               

            </div>

            <div className="weFour-content-list" >
                <div className="noDataShow" style={{display:this.state.noDataStyle}}>
                    <p >暂无数据...</p> 
                </div>
              
            
              {/* 列表 */}
              <ul className="weFour-list">

                {
                  this.state.list.map((item,index)=>{
                      return(
                        <li key={item.id}>
                        <Link to={`/${this.state.detailPaths}/`+item.id
                        +`?title=${  item.makeupName ? item.makeupName : ""}${item.emceeName ? item.emceeName : ""}${item.cameraName ? item.cameraName : ""}${item.photographyName ? item.photographyName : ""}`//标题部分
                        +`&qiniu=${this.state.qiNiuUrl}`//七牛头
                        +`&imgUrl=${item.pictureKey}`//图片尾部
                        +`&content1=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.city ? item.city : ""}`//城市
                        +`&content2=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.introduce ? item.introduce : ""}`
                        +`&content3=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.prices ? item.prices : ""}`
                        +`&content4=${  item.schemeHeadlin ? item.schemeHeadlin : ""}${item.starred ? item.starred : ""}`
                        +`&content5=${  item.classify ? item.classify : ""}${item.style ? item.style : ""}`
                        

                        
                     
                        }>
                          
                          <p>{  item.makeupName ? item.makeupName : ""}{item.emceeName ? item.emceeName : ""}${item.cameraName ? item.cameraName : ""}{item.photographyName ? item.photographyName : ""} <span>{item.prices ? item.prices : ""}</span></p>
                          <p>{item.introduce}</p>
                          <img src={this.state.qiNiuUrl+item.pictureKey}/>
                        </Link>
                        </li>
                      )
                  })

                }
                 <div style={{display:this.state.loadMoreStyle}} className="loadMore" ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>加载更多</div>
              </ul>
            </div>  
        </div>
      )

  }

}