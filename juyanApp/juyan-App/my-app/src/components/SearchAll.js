import React,{Component} from 'react';
import '../assets/css/searchAll.css';
import { Input } from 'antd';
import {setCookie,getCookie,delCookie} from '../utils/utils';
export default class SearchAll extends Component{
    constructor(props){
        super(props);
        this.state= {
            searchValue:'',
            searchRecord:[],
            style: {display:"block",color:"red",height:"2rem"}
        };

      }
      
      toSearch(value){
          let searchValue=getCookie('searchValue');
        
          
          console.log("当前的value值",value)
          if(!value==""){
            searchValue+=value+","
            setCookie('searchValue',searchValue,100000);
            console.log("获取的cookie",getCookie('searchValue'))
          }

          let strCenter=getCookie('searchValue')                    //获取cookie字符串（最后面是带逗号的）
          let searchAllValue = strCenter.slice(0,strCenter.length-1)//去掉逗号的cookie字符串
          let  cookieRepeatArr = searchAllValue.split(",");         //未去重复的数据
          let cookieAllArr = dedupe(cookieRepeatArr)                //全部数据
          let cookieArr= cookieAllArr.reverse()                     //数组反转
          let cookieArrSix= cookieArr.slice(0, 6)                   //前几条数据
          this.setState({
              searchRecord:cookieArrSix
          })
  
          if(cookieArrSix[0]==""){
              cookieArrSix=[]
              this.setState({
                  searchRecord:cookieArrSix
              })
  
          }
          function dedupe(array){
              return Array.from(new Set(array));
             }                    //数组去重                 
          console.log('要显示的数组',cookieArr)
          console.log('要显示的数组长度',cookieArr.length)
          let dataStyle={height:"2rem",width:'100%'};
          if(cookieArrSix.length==0){
              console.log("确认没数据")
               dataStyle={display:"none"};
  
          } 
          
      }
      DeletCookie(){
        delCookie("searchValue");
            this.setState({
                  searchRecord:[]
              })    

      }
      componentDidMount(){
        let strCenter=getCookie('searchValue')                    //获取cookie字符串（最后面是带逗号的）
        let searchAllValue = strCenter.slice(0,strCenter.length-1)//去掉逗号的cookie字符串
        let  cookieRepeatArr = searchAllValue.split(",");         //未去重复的数据
        let cookieAllArr = dedupe(cookieRepeatArr)                //全部数据
        let cookieArr= cookieAllArr.reverse()                     //数组反转
        let cookieArrSix= cookieArr.slice(0, 6)                   //前几条数据
        this.setState({
            searchRecord:cookieArrSix
        })

        if(cookieArrSix[0]==""){
            cookieArrSix=[]
            this.setState({
                searchRecord:cookieArrSix
            })

        }
        function dedupe(array){
            return Array.from(new Set(array));
           }                    //数组去重                 
        console.log('要显示的数组',cookieArr)
        console.log('要显示的数组长度',cookieArr.length)
        let dataStyle={height:"2rem",width:'100%'};
        if(cookieArrSix.length==0){
            console.log("确认没数据")
             dataStyle={display:"none"};

        } 
      }
      
      render(){
        const Search = Input.Search;
          return(
              
          <React.Fragment>


              
           <div className="searchAll">
           <div className="public-title">
               <p className="public-back" onClick={()=>{history.go(-1)}}>
                    <img src="../assets/img/icon_back.png"/>
                </p>
                <Search
                    className="searchAll-head-box"
                    placeholder="input search text"
                    onSearch={this.toSearch.bind(this)}
                    enterButton
                   
                />


              </div>
            <div className="searchAll-content">
                <div className="searchAll-hot">
                    <p>热门搜索  <img onClick={this.DeletCookie.bind(this)} src="../assets/img/icon_delet.png"/></p>
                   
                    <ul>

                        {
                            this.state.searchRecord.map((item,index)=>{
                                return (
                                   
                                    <li key={index}>{item}</li>
                                )
                            })
                        }

                    </ul>
                </div>
               
                <div className="searchAll-record">
                    <p>搜索记录 <img src="../assets/img/icon_delet.png"/></p>
                    <ul>
                        <li>记录1</li>
                        <li>记录2</li>
                        <li>记录3</li>
                        <li>记录4</li>
                        <li>记录5</li>
                    </ul>
                </div>
            </div>
            
           </div>
           
          
          </React.Fragment>
              
          )
      }
}