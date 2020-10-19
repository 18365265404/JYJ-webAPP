import React,{Component} from 'react';
import '../assets/css/wePicture.css';

import querystring from 'query-string';
import {postRequest,getRequest} from '../utils/api';
import { Toast} from 'antd-mobile';
import url from '../utils/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Input, Select, Icon } from 'antd';



export default class WePicture extends Component{

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
      selectList2:[{name:'从高到低',id:'a'},{name:'从低到高',id:'d'}],
      lift:"",
      style:"",
      noDataStyle:"none",
      loadMoreStyle:"block",
      searchValue:"",
      pages:""//总页数
      
    }

  };
  

  goSearch(value){
    console.log(value,"111111111111111")
    this.setState({
        searchValue:value
    })

    postRequest(url.waaWAfindAllWeddingPictures, {
        weddingPicturesName  : value ? value :"",


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
    const _this=this;
    postRequest(url.waaWAfindAllWeddingPictures, {
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


    postRequest(url.waaWAfindAllDictionaries, {
        type:"C-HSZ"
    }).then(resp=> {
            console.log("select打印的数据",resp.data)
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
      // const _this=that;
      that.state.currentPage++;
      if(that.state.currentPage> that.state.pages){
        Toast.info('没有更多了', 1);
        return
      }
      postRequest(url.waaWAfindAllWeddingPictures, {
        weddingPicturesName : this.state.searchValue ? this.state.searchValue :"",
        style:this.state.style ? this.state.style : "",
        lift:this.state.lift ? this.state.lift : "",
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

        if(kind=="type"){
            this.setState({
                style:value
              })
              console.log("类型")
              console.log("当前的参数",this.state.lift,value)
                postRequest(url.waaWAfindAllWeddingPictures, {
                    lift:this.state.lift ? this.state.lift : "",
                    style:value
                        }).then(resp=> {
                                console.log("select查询打印的数据",resp.data)
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
        if(kind=="price"){
            this.setState({
                lift:value
              })
              console.log("价格")
              console.log("当前的仓鼠",value,this.state.style)
            postRequest(url.waaWAfindAllWeddingPictures, {
                lift:value,
                style:this.state.style ? this.state.style : ""
                    }).then(resp=> {
                            console.log("select查询打印的数据",resp.data)
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




    }


      return(
        <div className="wePicture" style={{display:"flex",flexDirection:"column"}}>
              <div className="public-title2">
               <p className="public-back2" onClick={()=>{history.go(-1)}}>
                    <img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem"}}/>
                </p>
                <span>{this.state.name}</span>
                <a style={{opacity:"0"}}>
                      <img style={{display:"none"}} src="../assets/img/icon_search.png" />
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
          <div className="ThemeList-search" style={{display:"none"}}>
          <Select
            className="ThemeList-search1"
            showSearch
            style={{ width: "45%",marginLeft:"3%"}}
            placeholder="区/县"
            optionFilterProp="children"
            onChange={handleChange.bind(this,"type")}
            size="small"
            >
                {
                  this.state.selectList1.map((item,index)=>{
                    return (
                        <Option className="ThemeList-search-item" value={item.dictionaryName}  key={item.id}>{item.dictionaryName}</Option>
                    )
                  })
                }

          </Select>
          <Select
            className="ThemeList-search2"
            showSearch
            style={{ width: "45%",marginLeft:"3%"}}
            placeholder="价格"
            optionFilterProp="children"
            onChange={handleChange.bind(this,"price")}
            size="small"
            >
                {
                  this.state.selectList2.map((item,index)=>{
                    return (
                        <Option value={item.name}  key={item.id}>{item.name}</Option>
                    )
                  })
                }

          </Select>



          
          </div>
            <div className="wePicture-content-list" >
                <div className="noDataShow" style={{display:this.state.noDataStyle}}>
                    <p >暂无数据...</p> 
                </div>
              
            
              {/* 列表 */}
              <ul className="wePicture-list">

                {
                  this.state.list.map((item,index)=>{
                      return(
                        <li key={item.id}>
                        <Link to={"/WePictureDetail/"+item.id
                        +"?title="+item.weddingPicturesName
                        +"&qiniu="+this.state.qiNiuUrl
                        +"&imgUrl="+item.pictureKey
                        +"&city="+item.city
                        +"&modelling="+item.modelling
                        +"&starLevel="+item.starLevel
                        +"&team="+item.team
                        +"&truing="+item.truing
                        +"&shoot="+item.shoot
                        
                        }>
                          
                          <p>{item.weddingPicturesName}</p>
                          <p>{item.describe}</p>
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