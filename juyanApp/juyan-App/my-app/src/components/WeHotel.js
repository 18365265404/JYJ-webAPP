import React,{Component} from 'react';
import '../assets/css/weHotel.css';
import querystring from 'query-string';
import {postRequest,getRequest} from '../utils/api';
import { Toast} from 'antd-mobile';
import url from '../utils/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import { Input, Select, Icon } from 'antd';
import { getCookie ,setCookie} from '../utils/utils';


export default class weHotel extends Component{

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
      selectList1:[],
      selectList2:[{name:'全部',id:'全部'},{name:'0-2000',id:'0-2000'},{name:'2000-4000',id:'2000-4000'},{name:'4000-6000',id:'4000-6000'},{name:'6000以上',id:'6000-100000'}],
      price:"",
      city:"",
      noDataStyle:"none",
      loadMoreStyle:"block",
      selectValue:"",
      pages:"",//总页数
      searchValue:""
      
    }

  };



  goSearch(value){
    console.log(value,"111111111111111")
    this.setState({
        searchValue:value
    })

    postRequest(url.waaWAfindAllWeddingHotel, {
        weddingHeadline : value ? value :"",
        city:this.state.city ? this.state.city : "",
        price:this.state.price ? this.state.price : "",

      }).then(resp=> {
            console.log("search打印的数据",resp.data)
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
  componentDidMount(){

    if(getCookie("scheme")){
        this.setState({
            list:getCookie("scheme")
        })
        return
    }
    
    const _this=this;
    postRequest(url.waaWAfindAllWeddingHotel, {


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

    postRequest(url.waaWAfindAllCounties, {
        cityName:getCookie("city")
    }).then(resp=> {
            console.log("select打印的数据",resp.data)
            let curentSelect= resp.data.data
            curentSelect.unshift({countiesName:"全部",id:"00"})
            this.setState({
                selectList1:resp.data.data
            })

          

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
        console.log("城市",getCookie("city"))
      // const _this=that;
      that.state.currentPage++;
      if(that.state.currentPage> that.state.pages){
        Toast.info('没有更多了', 1);
        // that.state.currentPage="1"
        return
      }
      postRequest(url.waaWAfindAllWeddingHotel, {
        weddingHeadline : this.state.searchValue ? this.state.searchValue :"",
        city:this.state.city ? this.state.city : "",
        price:this.state.price ? this.state.price : "",
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

    const Option = Select.Option;

    const Search = Input.Search;
    
    function handleChange(kind,value) {
        let values=value
        if(values=="全部"){
           
            values=""
            console.log("是全部")
        }
        if(kind=="city"){
            this.setState({
                city:values
              })
              console.log("类型")
              console.log("当前的参数",this.state.price,values)
                postRequest(url.waaWAfindAllWeddingHotel, {
                    // weddingHeadline:"宴会厅",
                    weddingHeadline : this.state.searchValue ? this.state.searchValue :"",
                    city:values,
                    price:this.state.price ? this.state.price : "",

                        }).then(resp=> {
                                console.log("select查询打印的数据",resp.data)
                                this.setState({
                                list:resp.data.data.findAll.list,
                                qiNiuUrl:resp.data.data.qiniu,
                                pages:resp.data.data.findAll.pages,
                                currentPage:"1"
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
        if(kind=="price"){
            let values=value
            if(values=="全部"){
               
                values=""
                console.log("是全部")
            }
            this.setState({
                price:values
              })
              console.log("价格")
              console.log("当前的仓鼠",values,this.state.city)
            postRequest(url.waaWAfindAllWeddingHotel, {
                weddingHeadline : this.state.searchValue ? this.state.searchValue :"",
                price:values,
                city:this.state.city ? this.state.city : ""
                    }).then(resp=> {
                            console.log("select查询打印的数据",resp.data)
                            this.setState({
                            list:resp.data.data.findAll.list,
                            qiNiuUrl:resp.data.data.qiniu,
                            pages:resp.data.data.findAll.pages,
                            currentPage:"1"
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




    }





      return(
        <div className="weHotel" style={{display:"flex",flexDirection:"column"}}>
              <div className="public-title2">
               <p className="public-back2" onClick={()=>{history.go(-1)}}>
                    <img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem"}}/>
                </p>
                <span>{this.state.name}</span>
                <a style={{opacity:"0"}}>
                      <img  src="../assets/img/icon_search.png" />
                </a>

              </div>
            
          <div style={{flex:"1" ,overflowY: "auto"}}>
        
          <div style={{margin:" -0.2rem 0",marginBottom:"-0.5rem"}}>

                 <Search
                    placeholder="请搜索"
                    onSearch={this.goSearch.bind(this)}
                    style={{ width:"93.5%",margin:" 3%" }}
                    size="small"
                    
                    />   
            </div>  
         
          {/* 选择框 */}
          <div className="ThemeList-search" style={{marginLeft:"3%",position:"relative"}}>
          <Select
      
            className="ThemeList-search1"
            showSearch
            style={{ width: "45%"}}
            placeholder="区/县"
            optionFilterProp="children"
            onChange={handleChange.bind(this,"city")}
         
            size="small"
            
            >
                {
                  this.state.selectList1.map((item,index)=>{
                    return (
                        <Option className="ThemeList-search-item" value={item.countiesName}  key={item.id}>{item.countiesName}</Option>
                    )
                  })
                }
            
          </Select>

          <Select
            className="ThemeList-search2"
            showSearch
            style={{ width: "48.5%",marginLeft:"3%"}}
            placeholder="价格"
            optionFilterProp="children"
            onChange={handleChange.bind(this,"price")}
            size="small"
            >
                {
                  this.state.selectList2.map((item,index)=>{
                    return (
                        <Option value={item.id}  key={item.id}>{item.name}</Option>
                    )
                  })
                }

          </Select>



          
          </div>
            <div className="weHotel-content-list" >
{/* ------------------------------------------没数据时候的显示------------------------------------------------------------- */}
                <div className="noDataShow" style={{display:this.state.noDataStyle}}>
                    <p >暂无数据...</p> 
                </div>
              
            
              {/* 列表 */}
              <ul className="weHotel-list">

                {
                  this.state.list.map((item,index)=>{
                      return(
                        <li key={item.id}>

                        <div className="weHotel-list-detail">
                            <p>{item.weddingHeadline}</p>
                            <p >容纳桌数：{item.tableNumber}桌 <span>承办场数：{item.severalTimes}场</span></p>
                            <ul style={{display:"none"}} className="weHotel-list-infor">
                              <li>{item.describe}</li>
                              <li>{item.describe2}</li>
                              <li>{item.describe3}</li>
                            </ul>
                          </div>
                        <Link to={"/WeHotelDetail/"+item.id
                        +"?title="+item.weddingHeadline
                        +"&qiniu="+this.state.qiNiuUrl
                        +"&imgUrl="+item.pictureKey
                        +"&activity="+item.activity
                        +"&address="+item.address
                        +"&describe="+item.describe
                        +"&describe2="+item.describe2
                        +"&describe3="+item.describe3
                        +"&hotelType="+item.hotelType
                        +"&price="+item.price
                        +"&severalTimes="+item.severalTimes
                        +"&starredHotel="+item.starredHotel
                        +"&tableNumber="+item.tableNumber
                        } className="ThemeList-content-list" >
                          
                          
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
        </div>
      )

  }

}