import React,{Component} from 'react';
import '../assets/css/ThemeList.css';
import querystring from 'query-string';
import { Select } from 'antd';

import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import ReactPullLoad,{ STATS } from 'react-pullload'
import { PullToRefresh, Button } from 'antd-mobile';
import { Toast} from 'antd-mobile';

function genData() {
    const dataArr = [{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'},
                    {name:'北京',id:'4'},{name:'上海',id:'5'},{name:'长春',id:'6'},
                    {name:'北京',id:'7'},{name:'上海',id:'8'},{name:'长春',id:'9'}
                
];
   
    return dataArr;
  }
export default class ThemeList extends Component{

    constructor(props){
        super(props);
        this.state= {
            name:querystring.parse(props.location.search).title,
            refreshing: false,
            down: true,
            currentPage:"1",
            height: document.documentElement.clientHeight,
            data: [],
          
        };
       

        console.log(querystring.parse(props.location.search).title,"传过来的名字")

        
      }
      componentDidMount() {



/**
 * *************************************************下拉上啦代码start***************************************************************************
 */
        window.addEventListener('scroll', this.handleScroll);
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        console.log(hei,"显示的高度")
        setTimeout(() => this.setState({
          height: hei,
          data: [{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'},
                  {name:'北京',id:'4'},{name:'上海',id:'5'},{name:'长春',id:'6'},
                  {name:'北京',id:'7'},{name:'上海',id:'8'},{name:'长春',id:'9'}
                
        ]
        }), 0);

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
                // that.setState({
                //     down:false
                // })
                
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
    // 加载更多
      loadMoreDataFn(that) {
          that.state.currentPage++;
          console.log("当前的页数",that.state.currentPage);
          if(that.state.currentPage>3){
            Toast.info('没有更多了', 1);
            
          }else{
            that.setState({
                data: that.state.data.concat({name:'新泽西112',id:'311'},{name:'芝加哥12',id:'312'},{name:'新奥尔良112',id:'331'},
                {name:'休斯顿112',id:'314'},{name:'落砂机12',id:'315'},{name:'亚特兰大4',id:'316'},{name:'新泽西345',id:'317'},{name:'芝加哥34',id:'318'},{name:'新奥尔良345',id:'319'},
                {name:'休斯顿112',id:'410'},{name:'落砂机334',id:'411'},{name:'亚特兰大34',id:'412'},)
              })

          }
          
        
      }
    
/**
 * *************************************************下拉上啦代码over***************************************************************************
 */

  render(){


    
    let {history,match} = this.props;
    const Option = Select.Option;
    const selectList=[{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'}];
    function handleChange(value) {
      console.log(`selected ${value}`);

    }
   
/**
 * *************************************************下拉上啦代码start***************************************************************************
 */
//下拉刷新数据列表
    function onFresh(){
        console.log("触发了")
        this.setState({refreshing: true,currentPage:1 });
        console.log("当前的页数",this.state.currentPage)
          setTimeout(() => {
            this.setState({ refreshing: false ,
                data: [
                    {name:'新泽西',id:'21'},{name:'芝加哥',id:'22'},{name:'新奥尔良',id:'23'},
                    {name:'休斯顿',id:'24'},{name:'落砂机',id:'25'},{name:'亚特兰大',id:'26'},
                    {name:'新泽西',id:'2121'},{name:'芝加哥',id:'202'},{name:'新奥尔良',id:'123'},
                    {name:'休斯顿',id:'22344'},{name:'落砂机',id:'295'},{name:'亚特兰大',id:'626'},
                    {name:'新泽西',id:'281'},{name:'芝加哥',id:'422'},{name:'新奥尔良',id:'3423'},
                    {name:'休斯顿',id:'284'},{name:'落砂机',id:'625'},{name:'亚特兰大',id:'426'},         
                  ]  
            
            });
           
          }, 1000);
          
   
     }
/**
 * *************************************************下拉上啦代码over***************************************************************************
 */
    

    
     

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
          {/*列表带有下拉上拉*/}
          <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={onFresh.bind(this)}

      >
        {
                  this.state.data.map((item,index)=>{
                    return (
                        <li key={item.id}>
                          <Link to={"/ThemeDetail/"+item.id+"?title="+item.name} className="ThemeList-content-list" >
                            
                              <img src="../assets/images/img_1.jpg" alt=""/>
                              <div>
                                  <p>{item.name}</p>
                                  <p>价格：1毛5一年</p>
                                  <p>面积：1亿㎡</p>
                              </div>
                            
                          </Link>
                    </li>
                    )
                  })
                }
                 <div className="loadMore" ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>加载更多</div>
      </PullToRefresh>

         

      </div>
    )
  }
}