import React,{Component} from 'react';
import '../assets/css/ThemeList.css';
import querystring from 'query-string';
import { Select } from 'antd';

import {Link} from 'react-router-dom';


export default class ThemeList extends Component{

    constructor(props){
        super(props);
        this.state= {
            name:querystring.parse(props.location.search).title,
            data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            isLoadingMore: false

        };
       

        console.log(querystring.parse(props.location.search).title,"传过来的名字")


        
      }

      componentDidMount() {
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
    
      loadMoreDataFn(that) {
        that.setState({
          data: that.state.data.concat(['E', 'c', 'h', 'o'])
        })
      }
    


  render(){


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

          {this.state.data.map((item, index) => (
            <li key={index} className="li-item">{item}</li>
          ))}
          <div className="loadMore" ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>加载更多</div>

      </div>
    )
  }
}