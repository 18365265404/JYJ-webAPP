import React,{Component} from 'react';
import {postRequest,getRequest,postRequestNocity} from '../utils/api';
import url from '../utils/url';
import '../assets/css/questionnaire.css';
import {Link,NavLink} from 'react-router-dom';
import {Toast } from 'antd-mobile';
import { Popover,Modal,Carousel ,Input, Select, Icon ,DatePicker,Button } from 'antd';
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
                selectList3:[{name:"婚宴",id:"1"},{name:"宝宝宴",id:"2"},{name:"生日宴",id:"3"},{name:"商务活动",id:"4"}],   
                selectList4:[{name:"0-10桌",id:"1"},{name:"10-20桌",id:"2"},{name:"20-30桌",id:"3"},{name:"30桌以上",id:"4"}], 
                allStarNum:"",
                foodStarNum:"",
                serverNum:"",
                visible2:true,
                chooseTime:moment(`${moment().format('YYYY-MM')}`, 'YYYY-MM')._i,
         
				};


	}


    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
      }
      onChangeTelName = (e) => {
        this.setState({ telNum: e.target.value });
      }
      onChangemyName = (e) => {
        this.setState({ myName: e.target.value });
      }

      onChangeTelmyName = (e) => {
        this.setState({ myTel: e.target.value });
      }
      
//声明周期钩子函数  
  componentDidMount(){
    
    
    // 查询所有城市
    postRequestNocity(url.waaWAfindAllCity, {
        
        }).then(resp=> {
                console.log("select打印的数据",resp.data.data.list)
                // let curentSelect= resp.data.data.list
                // curentSelect.unshift({countiesName:"全部",id:"00"})
                this.setState({
                    selectList1:resp.data.data.list
                })
    
            });
     
  }

/************ 表单提交***************** */
// 点击提交时候的按钮
handleOk = (e) => {
    
    
      console.log("表单内的数据 ",1111111,this.state.userName,22222222,this.state.telNum,333333,this.state.hotelKind,"000000000",this.state.tableNumber,4444444,this.state.chooseTime,555555,this.state.cityOne,66666,this.state.cityTwo,8888,this.state.myName,9999,this.state.myTel)
      
    
    var telValue=this.state.telNum;
    if(!telValue){
        Toast.info('手机号码不能为空', 1);
        return
    }
    if(!isPoneAvailable(telValue)){
        Toast.info('请输入正确的手机号码', 1);
        return
    }

    console.log("表单内的数据6666666666 ",1111111,this.state.userName,
    22222222,this.state.telNum,
    333333,this.state.hotelKind,
    "000000000",this.state.tableNumber,
    4444444,this.state.chooseTime,
    555555,this.state.cityOne,
    66666,this.state.cityTwo,
    8888,this.state.myName,
    9999,this.state.myTel)
    
    if(!this.state.userName ||!this.state.hotelKind || !this.state.tableNumber|| !this.state.chooseTime|| !this.state.myName|| !this.state.myTel ){
        Toast.info("表单内容不能为空",1)
        return 
    }
    if(this.state.cityTwo.length==0){
      Toast.info("表单内容不能为空",1)
      return
    }
    
    
    postRequestNocity(url.waaWAinsertRecommend, {
      
        
        name:this.state.userName ,
        phone :this.state.telNum,
        tableNumber:this.state.tableNumber,
        banquetType : this.state.hotelKind,
        banquetTime : this.state.chooseTime,
        city : this.state.cityOne,
        counties : this.state.cityTwo,
        recommendName:this.state.myName,
        recommendPhone:this.state.myTel,
    
            }).then(resp=> {
                    console.log("提交表单打印的数据",resp.data.msg)
                    this.setState({
                        visible2: false,
                    });
                    Toast.info(resp.data.msg, 1);
        
     });
    
    
    function isPoneAvailable(str) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }
    
    }

//   弹窗的显示
showModal = () => {
    this.setState({
        visible2: true,
  
      })

      this.setState({
        visible2: true,
        userName:"",
        telNum:"",
        cityOne:"",
        cityTwo:[],
        hotelKind:"",
        tableNumber:"",
        myName:"",
        myTel:"",
        // chooseTime:""
      })  
}

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
    });
    }



    render(){

    // POP弹窗内的东西
    const Option = Select.Option;
    const Search = Input.Search;
    let {homeData}=this.props;

    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    
    //第一个select事件
    function handleChange1(value) {
        console.log(value,"选择的城市")
        this.setState({
          cityOne : value
        })


    // if(this.state.cityTwo.length!=0){
    //   console.log("触发了当前的select已经选择的城市")
    //   this.setState({
    //     cityTwo:[]
    //   })
    // }    
    // 根据第一个select选择查询二级城市
    postRequestNocity(url.waaWAfindAllCounties, {
          cityName:value
      }).then(resp=> {
              console.log("select2打印的数据",resp.data)

              this.setState({
                selectList2:resp.data.data
              })
  
            
  
      });
       
  

    }
    //第二个select事件
    function handleChange2(value) {
        console.log(value,"第二个城市选择")
        this.setState({
          cityTwo : value
        })
            
    }
    //第三个select事件
    function handleChange3(value) {
        console.log(value,"宴会厅选择")
        this.setState({
          hotelKind : value
        })
            
    }

        //第四个select事件
        function handleChange4(value) {
          console.log(value,"宴会厅选择")
          this.setState({
            tableNumber : value
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
        

            <div >
                <Button type="primary" onClick={this.showModal}  style={{width:"4rem",height:"3rem",textAlign:"center",marginTop:"7rem",marginLeft:"3rem" }}>
                    再次推荐
                </Button>
            </div>
            
            <div style={{marginLeft: "1rem",marginTop: "0.8rem"}}>
            <div id="pops" style={{marginTop:"2rem"}}>
                <Modal
                    title={null}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    // closable={false}
                    style={{position:"absolute",left:"0",top:"0"}}
                    visible={this.state.visible2}
                    
                    onCancel={this.handleCancel}
                    >
                    <div >
                    <p style={{
                        textAlign:"center"
                    }}>推荐客户</p>

              <ul style={{width:"8.15rem"}}>
                <li>
                <span style={{marginBottom:"0rem"}}>请输入客户的姓名:</span> <br/>
                <Input
                        style={{ marginTop:"0.15rem"  }}
                        placeholder="请输入客户的姓名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                        onChange={this.onChangeUserName}
                        value={this.state.userName}
                        size="small"
                      
                    />
                </li>

                <li style={{marginTop:"0.3rem"}}>
                <span style={{marginBottom:"0rem"}}>请输入客户的手机号码:</span> <br/>
                <Input
                        style={{ marginTop:"0.15rem"  }}
                        placeholder="请输入客户的手机号码"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeTelName}
                        value={this.state.telNum}
                        
                        size="small"
                    />
                </li>

              
                   
                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择城市：</span><br/>
                    
                    <Select
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="城市"
                        value={this.state.cityOne}
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

                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择区/县：</span> <br/>
                    <Select
                        mode="multiple"
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="区/县"
                        optionFilterProp="children"
                        value={this.state.cityTwo}
                        onChange={handleChange2.bind(this)}
                        // defaultValue={this.state.countryCity}
                        // allowClear={this.state.clearStatus}
                        // autoClearSearchValue={this.state.clearStatus}
                        
                        size="small"
                        >
                            {
                            this.state.selectList2.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.countiesName}  key={item.id}>{item.countiesName}</Option>
                                )
                            })
                            }

                    </Select>
                </li>

                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选宴会类型：</span> <br/>
                    <Select
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="类型"
                        optionFilterProp="children"
                        value={this.state.hotelKind}
                        onChange={handleChange3.bind(this)}
                        size="small"
                        >
                            {
                            this.state.selectList3.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.name}  key={item.id}>{item.name}</Option>
                                )
                            })
                            }

                    </Select>
                </li>
                <li style={{marginTop:"0.3rem"}}>
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选桌数：</span> <br/>
                    <Select
                        className="ThemeList-search1"
                        
                        style={{ width: "100%"}}
                        placeholder="桌数"
                        optionFilterProp="children"
                        value={this.state.tableNumber}
                        onChange={handleChange4.bind(this)}
                        size="small"
                        >
                            {
                            this.state.selectList4.map((item,index)=>{
                                return (
                                    <Option className="ThemeList-search-item" value={item.name}  key={item.id}>{item.name}</Option>
                                )
                            })
                            }

                    </Select>
                </li>

                <li style={{marginTop:"0.3rem"}}>
                    
                    <span style={{fontSize: "0.4rem",marginLeft: "0.1rem"}}>请选择客户宴会的需求时间：</span> 
                    <br/>

                   
                    <MonthPicker defaultValue={moment(`${moment().format('YYYY-MM')}`, 'YYYY-MM')}  placeholder="选择年月" onChange={onChangeTime.bind(this)} style={{ width: "100%"}}/>
                    {/* <DatePicker  defaultValue={moment(`${moment().format('YYYY-MM-DD')}`, 'YYYY-MM-DD')} /> */}
                </li>


                <li style={{marginTop:"0.3rem"}}>
                <span style={{marginBottom:"0rem"}}>请输入您的姓名:</span> <br/>
                <Input
                        style={{ marginTop:"0.15rem"  }}
                        placeholder="请输入您的姓名"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangemyName}
                        value={this.state.myName}
                        
                        size="small"
                    />
                </li>
                <li style={{marginTop:"0.3rem"}}>
                <span style={{marginBottom:"0rem"}}>请输入您的的手机号码:</span> <br/>
                <Input
                        style={{ marginTop:"0.15rem"  }}
                        placeholder="请输入您的的手机号码"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeTelmyName}
                        value={this.state.myTel}
                        
                        size="small"
                    />
                </li>
                
                </ul>
  
                    <Button type="primary" onClick={this.handleOk}  style={{width:"100%",height:"0.93rem",margin:"0 auto",textAlign:"center",marginTop:"0.5rem" }}>
                        确认提交
                    </Button>
                    </div>
                </Modal>
            </div>
            
            </div>
		</div>
 		

        </React.Fragment>
				
      )

    }
    
    }