import React,{Component} from 'react';

import '../assets/css/detail.css';
import querystring from 'query-string';
import date from '../common/date';




import {setCookie,getCookie,delCookie} from '../utils/utils';
import {postRequest,getRequest} from '../utils/api';
import axios from 'axios'
export default class Detail extends Component{
  constructor(props){
    super(props);
    this.state= {
      detail: ''
    };
    // props.dataName
    // props.match.params.id
    // let url=`/data/art icle_${querystring.parse(props.location.search).dataName}.data`;
    // this.getJSON(url,'detail');
  }


  newslistclick = () => {
    
    return e => {
        console.log("d点击了")
        console.log(getCookie('token'),"获取的token、")
        var  tokens=getCookie("token")


        
        postRequest(`/user/selectAllUser`, {
          // token: getCookie("token")

        }).then(resp=> {
                console.log("打印的数据铲鲟说有",resp.data)
                this.props.history.push('/User') 

            }
        );



    }
  }
   componentDidMount(){
     console.log("11111")
    

     var  tokens=""
    postRequest('/ln/login', {
        username: "admin",
        password: "123456"
    }).then(resp=> {
            console.log("打印的数据",resp.data)
            setCookie('token',resp.data.data.token,100000);
          //   tokens=resp.data.data.token;
           
            getCookie('token')


        });
  }

  // getJSON(url,key){
  //   fetch(url).then(
  //     res=>res.json()
  //   ).then(
  //     data=>this.setState({[key]:data[this.props.match.params.id-1]})
  //   )
  // }
  render(){
    let {history,match} = this.props;
    let detail=this.state.detail;
    return (
      <React.Fragment>
        
        <div id="nav" onClick={()=>{history.go(-1)}}>
          <ul>
            <li className="l-btn" ></li>
          </ul>
        </div>
        <div className="content">

        <button onClick={this.newslistclick()}>十多个</button>
          <div className="header clear"><h2><img width="100" src={detail && detail.author_face} alt=""/></h2><p>作者名字</p></div>
          <div className="cont">
            <h3>{detail.title}</h3>
            <div className="time"><p>{date(detail.time)}<span><img src="../assets/img/zan.png" alt=""/></span></p></div>
            <div className="text-box" dangerouslySetInnerHTML={{__html:detail.content}}></div>
          </div>
        </div>
        <div className="foot-btn">
          <ul>
            <li className="say"><a href="javascript:;">
              <i></i><span>0</span>
            </a></li>
            <li className="zan"><a href="javascript:;">
              <i></i><span>0</span>
            </a></li>
            <li className="xing"><a href="javascript:;">
              <i><img src="../assets/img/xing.png" alt=""/></i>
            </a></li>
            <li className="fx"><a href="javascript:;">
              <i><img src="../assets/img/fx.png" alt=""/></i>
            </a></li>
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

