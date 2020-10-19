import React,{Component} from 'react';
import '../assets/css/collectList.css';

import querystring from 'query-string';
import {postRequest,getRequest} from '../utils/api';
import { Toast} from 'antd-mobile';
import url from '../utils/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Select, Checkbox} from 'antd';



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
      refreshing: false,
      down: true,
      currentPage:"1",
      pageNum:"",
      height: document.documentElement.clientHeight,
      data: [],

      prices:"",
      style:"",
      noDataStyle:"none",
      loadMoreStyle:"block",
      
      pages:"",//总页数

      checkedList: [],
      chooseId:"",
      indeterminate: false,
      checkAll: false,
      allIdLIst:["1","2","3"]

      
    }

  };
  
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
      postRequest(url.waaWAfindAllWeddingPictures, {
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
        <div className="collectList">
              <div className="public-title">
               <p className="public-back" onClick={()=>{history.go(-1)}}>
                    <img src="../assets/img/icon_back.png"/>
                </p>
                <span>我的收藏</span>
                <Link to={"/SearchAll/"}>
                      <img src="../assets/img/icon_search.png" />
                </Link>

              </div>
            

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
                          
                          <p>{item.weddingName}</p>
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

            <div>

                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >
                    Check all
                </Checkbox>
                </div>
                <br />
                {/* <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} /> */}

                <CheckboxGroup   value={this.state.checkedList} onChange={this.onChange}>
               {
                 plainOptions.map((item, index) => {
                   return  <Checkbox value={item.id}  key={index} >{item.name}递四方速递电饭锅梵蒂冈风格</Checkbox >
                 })
               }
             </CheckboxGroup> 

            </div>


        </div>
      )

  }

}