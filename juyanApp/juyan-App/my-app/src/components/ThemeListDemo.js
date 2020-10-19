import React,{Component} from 'react';
import '../assets/css/ThemeList.css';
import querystring from 'query-string';
import { Select } from 'antd';

import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView, Button } from 'antd-mobile';

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

export default class ThemeList extends Component{

    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
    
        this.state= {
            name:querystring.parse(props.location.search).title,
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
       

        console.log(querystring.parse(props.location.search).title,"传过来的名字")


        
      }

      componentDidUpdate() {
        if (this.state.useBodyScroll) {
          document.body.style.overflow = 'auto';
        } else {
          document.body.style.overflow = 'hidden';
        }
      }
    
      componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(genData()),
            height: hei,
            refreshing: false,
            isLoading: false,
          });
        }, 1500);
      }
    
      onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            refreshing: false,
            isLoading: false,
          });
        }, 600);
      };
    
      onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        //加载中和最后一页数据时候，停止上拉事件
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.rData = [...this.rData, ...genData(++pageIndex)];
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 1000);
      };

      
  render(){


    let {history,match} = this.props;
    const Option = Select.Option;
    const selectList=[{name:'北京',id:'1'},{name:'上海',id:'2'},{name:'长春',id:'3'}];
    function handleChange(value) {
      console.log(`selected ${value}`);

    }
    
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}>
          <div>
            {obj.title}
          </div>
          <div >
            <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
            <div>
              <div>{obj.des}-{rowData}</div>
              <div><span>{rowID}</span> 元/任务</div>
            </div>
          </div>
        </div>
      );
    };

    
    

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
        
          <ListView
            key={this.state.useBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderHeader={() => <span>Pull to refresh</span>}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
            renderRow={row}
            renderSeparator={separator}
            useBodyScroll={this.state.useBodyScroll}
            style={this.state.useBodyScroll ? {} : {
              height: this.state.height,
              border: '1px solid #ddd',
              margin: '5px 0',
            }}
            pullToRefresh={<PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
            onEndReached={this.onEndReached}
            pageSize={5}
          />



      </div>
    )
  }
}