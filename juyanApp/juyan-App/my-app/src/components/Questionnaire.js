import React,{Component} from 'react';
import {postRequest,getRequest,postRequestNocity} from '../utils/api';
import url from '../utils/url';
import '../assets/css/questionnaire.css';
import {Link,NavLink} from 'react-router-dom';
import {Toast } from 'antd-mobile';
import { Input, Select, Icon ,DatePicker,Button } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { LocaleProvider } from 'antd';
import {getCookie,setCookie} from '../utils/utils';
// import { Button } from 'antd/lib/radio';

export default class Login extends Component{
	constructor(props) {
    super(props);
    this.state = {
				cityName: '',
                hotelName: '',
                chooseTime:"",
                selectList1:[],
                selectList2:[],
                allStarNum:"",
                foodStarNum:"",
                serverNum:"",
                


                starList1:[
                        {starStyle:"icon_collect",id:"1"},
                        {starStyle:"icon_collect",id:"2"},
                        {starStyle:"icon_collect",id:"3"},
                        {starStyle:"icon_collect",id:"4"},
                        {starStyle:"icon_collect",id:"5"}
                    ],
                starList2:[
                        {starStyle:"icon_collect",id:"1"},
                        {starStyle:"icon_collect",id:"2"},
                        {starStyle:"icon_collect",id:"3"},
                        {starStyle:"icon_collect",id:"4"},
                        {starStyle:"icon_collect",id:"5"}
                    ]    ,
                starList3:[
                        {starStyle:"icon_collect",id:"1"},
                        {starStyle:"icon_collect",id:"2"},
                        {starStyle:"icon_collect",id:"3"},
                        {starStyle:"icon_collect",id:"4"},
                        {starStyle:"icon_collect",id:"5"}
                    ]                    
				};


	}

//声明周期钩子函数  
  componentDidMount(){
    
    
    // 查询所有城市
    postRequest(url.waaWAfindAllCity, {
        
        }).then(resp=> {
                console.log("select打印的数据",resp.data.data.list)
                // let curentSelect= resp.data.data.list
                // curentSelect.unshift({countiesName:"全部",id:"00"})
                this.setState({
                    selectList1:resp.data.data.list
                })
    
            });
    //    // 查询所有宴会厅
    //    postRequestNocity(url.waaWAfindAllWeddingHotelName, {
    //     keyword:this.state.cityName
    //     }).then(resp=> {
    //             console.log("select2打印的数据",resp.data)
    //             // let curentSelect= resp.data.data.list
    //             // curentSelect.unshift({countiesName:"全部",id:"00"})
    //             this.setState({
    //                 selectList2:resp.data.data
    //             })
    
    //         });         
  }

  changeStar(index,kind){
    console.log("当前星星的位数",index)
    let currentStar=[]

    let star1=[
        {starStyle:"icon_star",id:"1"},
        {starStyle:"icon_collect",id:"2"},
        {starStyle:"icon_collect",id:"3"},
        {starStyle:"icon_collect",id:"4"},
        {starStyle:"icon_collect",id:"5"}
    ]
    let star2=[
        {starStyle:"icon_star",id:"1"},
        {starStyle:"icon_star",id:"2"},
        {starStyle:"icon_collect",id:"3"},
        {starStyle:"icon_collect",id:"4"},
        {starStyle:"icon_collect",id:"5"}
    ]
    let star3=[
        {starStyle:"icon_star",id:"1"},
        {starStyle:"icon_star",id:"2"},
        {starStyle:"icon_star",id:"3"},
        {starStyle:"icon_collect",id:"4"},
        {starStyle:"icon_collect",id:"5"}
    ]
    let star4=[
        {starStyle:"icon_star",id:"1"},
        {starStyle:"icon_star",id:"2"},
        {starStyle:"icon_star",id:"3"},
        {starStyle:"icon_star",id:"4"},
        {starStyle:"icon_collect",id:"5"}
    ]
    let star5=[
        {starStyle:"icon_star",id:"1"},
        {starStyle:"icon_star",id:"2"},
        {starStyle:"icon_star",id:"3"},
        {starStyle:"icon_star",id:"4"},
        {starStyle:"icon_star",id:"5"}
    ]

    switch (index) {
        case 0:
            currentStar=star1
        break;
        case 1:
            currentStar=star2
        break;
        case 2:
            currentStar=star3
        break;
        case 3:
            currentStar=star4
        break;
        case 4:
            currentStar=star5
        break;
    
        default:
            break;
    }
    switch (kind) {
        case "all":
            this.setState({
                starList1 : currentStar,
                allStarNum :index+1
            })

        break;
        case "food":
            this.setState({
                starList2:currentStar,
                foodStarNum : index+1
            })
        
        break;
        case "server":
            this.setState({
                starList3:currentStar,
                serverNum : index+1
            })
        break;
    
        default:
        break;
    }

  }
  subMit(){
      if(!this.state.cityName ||
         !this.state.chooseTime || 
         !this.state.hotelName||
         !this.state.allStarNum ||
         !this.state.foodStarNum || 
         !this.state.serverNum ){
             Toast.info("您还有未评价的部分哦~")
             return
         }
      console.log("提交是答应的书友数据",11111, this.state.cityName, 2222222,this.state.chooseTime,33333333,this.state.hotelName,444444,this.state.allStarNum,55555,this.state.foodStarNum,6666,this.state.serverNum)
    // yangzhen
    postRequest(url.waaWAinsertQuestionnaire, {
        city : this.state.cityName,
        dinnerTime : this.state.chooseTime,
        
        banquetHall: this.state.hotelName, 
        satisfaction : this.state.allStarNum, //整体满意度
        cuisinesSatisfaction : this.state.foodStarNum,   //菜肴的满意度
        serveSatisfaction : this.state.serverNum,  // 宴会厅服务满意度
        
        

        }).then(resp=> {
                Toast.info("提交成功，感谢您的评论")
                console.log("select2打印的数据",resp.data)
                var that=this
                // setTimeout(function(){
                //     that.props.history.push("/home");
                // },1000)
                
    
            });         
  
  }
  



    render(){


        const Option = Select.Option;
        const Search = Input.Search;
        const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
        
        //第一个select事件
        function handleChange1(value) {
            console.log(value,"选择的城市")
            this.setState({
                cityName : value
            })
    
               // 查询所有宴会厅
        postRequestNocity(url.waaWAfindAllWeddingHotelName, {
        keyword:value
        }).then(resp=> {
                console.log("select21321sdf 打印的数据",resp.data)
                // let curentSelect= resp.data.data.list
                // curentSelect.unshift({countiesName:"全部",id:"00"})
                this.setState({
                    selectList2:resp.data.data
                })
    
            });         
      
    
        }
        //第二个select事件
        function handleChange2(value) {
            
            this.setState({
                hotelName : value
            })
                
        }

        function onChangeTime(date, dateString) {

            this.setState({
                chooseTime:dateString
            })

        }

    return (
        <React.Fragment>

		<div className="questionnaire" style={{lineHeight: "0.8rem"}}>
        
            <div className="public-title">
               <p className="public-back"  >
                    <img src="../assets/img/icon_back.png" style={{width:"0.6rem",height:"0.4rem",opacity:"0"}}/>
                </p>
                <span style={{marginTop: ""}}>问卷调查</span>
                <a style={{opacity:"0"}}>
                      <img src="../assets/img/icon_search.png" />
                </a>

            </div>
            <div style={{marginLeft: "1rem",marginTop: "0.8rem"}}>

            <ul>
                <li>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择城市：</span>
                    <br/>
                    <Select
                        className="ThemeList-search1"
                        showSearch
                        style={{ width: "50%",marginLeft:"19%"}}
                        placeholder="城市"
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

                <li>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择宴会厅：</span>
                    <br/>
                    <Select
                        className="ThemeList-search1"
                        showSearch
                        style={{ width: "50%",marginLeft:"19%"}}
                        placeholder="宴会厅"
                        optionFilterProp="children"
                        onChange={handleChange2.bind(this)}
                        size="small"
                        >
                            {
                            this.state.selectList2.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.weddingHeadline}  key={item.id}>{item.weddingHeadline}</Option>
                                )
                            })
                            }

                    </Select>
                </li>

                <li>
                    
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择您参加宴会的时间：</span>
                    <br/>
                    <DatePicker placeholder="请选择时间" onChange={onChangeTime.bind(this)} style={{width:"50%", marginLeft: "19%"}}/>
                    {/* <DatePicker  defaultValue={moment(`${moment().format('YYYY-MM-DD')}`, 'YYYY-MM-DD')} /> */}
                </li>

                <br/>

                <li>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>整体满意度：</span>
                    <ul style={{display:"flex",marginLeft: "25%"}}>
                        {/* <li ><img src="../assets/img/icon_star.png"/></li>
                        <li ><img src="../assets/img/icon_collect.png"/></li> */}
                        {
                            this.state.starList1.map((item,index)=>{
                                return (
                                    <li  key={item.id}><img style={{width:"0.52rem",height:"0.52rem", marginRight:"0.2rem"}} src={`../assets/img/${item.starStyle}.png`} onClick={this.changeStar.bind(this,index,"all")}/></li>
                                )
                            })
                        }
                     
                    </ul>
                
                </li>

                <br/>

                <li>
                <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>菜品满意度：</span>
                    <ul style={{display:"flex",marginLeft: "25%"}}>
                        {/* <li ><img src="../assets/img/icon_star.png"/></li>
                        <li ><img src="../assets/img/icon_collect.png"/></li> */}
                        {
                            this.state.starList2.map((item,index)=>{
                                return (
                                    <li   key={item.id}><img style={{width:"0.52rem",height:"0.52rem", marginRight:"0.2rem"}} src={`../assets/img/${item.starStyle}.png`} onClick={this.changeStar.bind(this,index,"food")}/></li>
                                )
                            })
                        }
                     
                    </ul>
                
                </li>

                <br/>

                <li>
                <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>宴会服务满意度：</span>
                    <ul style={{display:"flex",marginLeft: "25%"}}>
                        {/* <li ><img src="../assets/img/icon_star.png"/></li>
                        <li ><img src="../assets/img/icon_collect.png"/></li> */}
                        {
                            this.state.starList3.map((item,index)=>{
                                return (
                                    <li  key={item.id}><img style={{width:"0.52rem",height:"0.52rem", marginRight:"0.2rem"}} src={`../assets/img/${item.starStyle}.png`} onClick={this.changeStar.bind(this,index,"server")}/></li>
                                )
                            })
                        }
                     
                    </ul>
                
                </li>
                
                
                
            </ul>

                <div style={{width: "20%"}}>
                    <Button onClick={this.subMit.bind(this)} style={{marginLeft: "1.8rem",marginTop: "0.5rem",width: "4.5rem",height: "1rem"}}>请提交您的评价</Button>
                </div>
            </div>
		</div>
 		

        </React.Fragment>
				
      )

    }
    
    }