import React,{Component} from 'react';
import '../assets/css/ThemeList.css';
import querystring from 'query-string';
import { Select } from 'antd';

import {Link} from 'react-router-dom';

import ReactPullLoad,{ STATS } from 'react-pullload'

export default class ThemeList extends Component{

    constructor(props){
        super(props);
        this.state= {
            name:querystring.parse(props.location.search).title,
            goodList:[{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'},{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'},{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'},{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'}],
            action: STATS.init,
            hasMore: true,
            isMore:1,
            page:1
          
        };
       

        console.log(querystring.parse(props.location.search).title,"传过来的名字")

        
      }
      handleAction = (action) => {
        console.info(action, this.state.action, action === this.state.action);
        //new action must do not equel to old action
        if(action === this.state.action) {
            return false
        }
    
        if(action === STATS.refreshing) { //刷新
            this.handRefreshing();
    
        } else if(action === STATS.loading) { //加载更多
            this.handLoadMore();
        } else {
            //DO NOT modify below code
            this.setState({
                action: action
            })
        }
    }
    //刷新
    handRefreshing = () => {
        if(STATS.refreshing === this.state.action) {
            return false
        }
        setTimeout(() => {
            //refreshing complete
            this.setState({
                hasMore: true,
                action: STATS.refreshed,
                goodList:[{name:'中国',id:'1'},{name:'美国',id:'2'},{name:'日本',id:'3'}],
            });
        }, 2000)
        this.setState({
            action: STATS.refreshing
        })
    }
    //加载更多
    handLoadMore = () => {
        if(STATS.loading === this.state.action) {
            return false
        }
        setTimeout(() => {
            if(this.state.isMore === 0) {
                this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else {
                var n=this.state.page;
                    n++;
                    $.ajax({
                        type: "POST",
                        url:httphead+"/author/goods/getList",
                        data:{
                            page:n,
                            end:10,
                            cateIds:catAllId,
                            keyword:this.state.value
                        },
                        headers:{
                            Authorization:headers_vendor
                        },
                        success:function(data){
                            
                            if(data.code == 100){
                                var nData = this.state.goodList.concat(data.data.goodsList);
                                this.setState({
                                    goodList:nData,
                                    action: STATS.reset,
                                    isMore:data.data.isMore,
                                    page:n
                                })
                            }else if(data.code == 500){
                                window.location.href = "/";
                            }else{
                                alert(data.message);
                            }
                        }.bind(this)
                    })
            }
        }, 500)
    
        this.setState({
            action: STATS.loading
        })
    }


  render(){

    const {
      data,  
      hasMore
    } = this.state
 
    const fixHeaderStyle = {
      position: "fixed",
      width: "100%",
      height: "50px",
      color: "#fff",
      lineHeight: "50px",
      backgroundColor: "#e24f37",
      left: 0,
      top: 0,
      textAlign: "center",
      zIndex: 1
    }

    let {history,match} = this.props;
    const Option = Select.Option;
    const selectList=[{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'}];
    function handleChange(value) {
      console.log(`selected ${value}`);

    }
    

    
    

    return (
      <div className="themeList">
      {/* title */}
          <div className="themeList-head">
                <p onClick={()=>{history.go(-1)}}>＜</p>
                <span>{this.state.name}</span>
                <img src="../assets/img/zan.png" alt=""/>
          </div>
          {/* 选择框 */}
          <div className="ThemeList-search">
          <Select
            className="ThemeList-search1"
            showSearch
            style={{ width: 200}}
            placeholder="城市"
            optionFilterProp="children"
            onChange={handleChange}
            size="small"
            >
                {
                  selectList.map((item,index)=>{
                    return (
                        <Option className="ThemeList-search-item" value={item.name}  key={item.id}>{item.name}</Option>
                    )
                  })
                }

          </Select>
          <Select
            className="ThemeList-search2"
            showSearch
            style={{ width: 200 }}
            placeholder="风格"
            optionFilterProp="children"
            onChange={handleChange}
            size="small"
            >
                {
                  selectList.map((item,index)=>{
                    return (
                        <Option value={item.name}  key={item.id}>{item.name}</Option>
                    )
                  })
                }

          </Select>
          <Select
            className="ThemeList-search3"
            showSearch
            style={{ width: 200 }}
            placeholder="价格"
            optionFilterProp="children"
            onChange={handleChange}
            size="small"
            >
                {
                  selectList.map((item,index)=>{
                    return (
                        <Option value={item.name}  key={item.id}>{item.name}</Option>
                    )
                  })
                }

          </Select>
          </div>

          {/* list列表 */}
          <ul className="ThemeList-content">

              {
                  selectList.map((item,index)=>{
                    return (
                        <li key={item.id}>
                          <Link to={"/ThemeDetail/"+item.id+"?title="+item.name} className="ThemeList-content-list" >
                            
                              <img src="../assets/images/img_1.jpg" alt=""/>
                              <div>
                                  <p>普罗旺斯厅</p>
                                  <p>价格：1毛5一年</p>
                                  <p>面积：1亿㎡</p>
                              </div>
                            
                          </Link>
                    </li>
                    )
                  })
                }
              
          </ul>

          <ReactPullLoad 
          downEnough={150}
          action={this.state.action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          style={{paddingTop: 50}}
          distanceBottom={1000}>
          <ul className="test-ul">
            <button onClick={this.handRefreshing}>refreshing</button>
            <button onClick={this.handLoadMore}>loading more</button>
            {
              this.state.goodList.map( (str, index )=>{
                return <li key={index}>{str.name}<span></span></li>
              })
            }
          </ul>
        </ReactPullLoad>

      </div>
    )
  }
}