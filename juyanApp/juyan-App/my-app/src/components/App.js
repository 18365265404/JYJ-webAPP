import React, { Component } from 'react';
import loadable from 'react-loadable';
import Loading from "./Loading";
import '../assets/css/App.css';

import FootBar from "./FootBar";
import Home from "./Home";
import 'antd-mobile/dist/antd-mobile.css';
import 'antd/dist/antd.css';
const Detail = loadable({loader:()=>import("./Detail"),loading:Loading});
const ThemeList = loadable({loader:()=>import("./ThemeList"),loading:Loading});
const ThemeDetail = loadable({loader:()=>import("./ThemeDetail"),loading:Loading});
const SearchAll = loadable({loader:()=>import("./SearchAll"),loading:Loading});
const Follow = loadable({loader:()=>import("./Follow"),loading:Loading});
const Column = loadable({loader:()=>import("./Column"),loading:Loading});
const User = loadable({loader:()=>import("./User"),loading:Loading});

const Test = loadable({loader:()=>import("./Test"),loading:Loading});


const Login = loadable({loader:()=>import("./Login"),loading:Loading});
const Register = loadable({loader:()=>import("./Register"),loading:Loading});
const Mine = loadable({loader:()=>import("./Mine"),loading:Loading});

const WeHotel = loadable({loader:()=>import("./WeHotel"),loading:Loading});
const WeHotelDetail = loadable({loader:()=>import("./WeHotelDetail"),loading:Loading});



const WedScheme = loadable({loader:()=>import("./WedScheme"),loading:Loading});
const WedSchemeDetail = loadable({loader:()=>import("./WedSchemeDetail"),loading:Loading});

const WeFour = loadable({loader:()=>import("./WeFour"),loading:Loading});
const WeFourDetail1 = loadable({loader:()=>import("./WeFourDetail1"),loading:Loading});
const WeFourDetail2 = loadable({loader:()=>import("./WeFourDetail2"),loading:Loading});
const WeFourDetail3 = loadable({loader:()=>import("./WeFourDetail3"),loading:Loading});
const WeFourDetail4 = loadable({loader:()=>import("./WeFourDetail4"),loading:Loading});

const WeFlower = loadable({loader:()=>import("./WeFlower"),loading:Loading});
const WeFlowerDetail = loadable({loader:()=>import("./WeFlowerDetail"),loading:Loading});

const WePicture = loadable({loader:()=>import("./WePicture"),loading:Loading});
const WePictureDetail = loadable({loader:()=>import("./WePictureDetail"),loading:Loading});

const WeFulldress = loadable({loader:()=>import("./WeFulldress"),loading:Loading});
const WeFulldressDetail = loadable({loader:()=>import("./WeFulldressDetail"),loading:Loading});

const CollectList = loadable({loader:()=>import("./CollectList"),loading:Loading});

const Questionnaire = loadable({loader:()=>import("./Questionnaire"),loading:Loading});

const RegisterHotel = loadable({loader:()=>import("./RegisterHotel"),loading:Loading});
const MessageList = loadable({loader:()=>import("./MessageList"),loading:Loading});
const MessageDetail = loadable({loader:()=>import("./MessageDetail"),loading:Loading});
const Pop = loadable({loader:()=>import("./Pop"),loading:Loading});


const Error = loadable({loader:()=>import("./Error"),loading:Loading});
// 2020/6/20新增
const Budget = loadable({loader:()=>import("./Budget"),loading:Loading});
const Gift = loadable({loader:()=>import("./Gift"),loading:Loading});







import {Route,Redirect,Switch} from 'react-router-dom';

import {connect} from 'react-redux';

import {UPDATE_NAV,UPDATE_FOOT} from '../store/types'

class App extends Component {

  
  render() {

    let {bNav,bFoot,bLoading,updateLoading,updateNav,updateFoot,location} = this.props;
    
        // console.log(bNav, bFoot);
    
        let path = location.pathname;
        if (/home/.test(path)){
          setTimeout(()=>{
            
            updateFoot(true);
          },0);
        }
        // if (/login|reg|detail/.test(path)){
        //   setTimeout(()=>{
        //     updateNav(false);
        //     updateFoot(false);
        //   },0);
        // }
        // if (/user/.test(path)){
        //   setTimeout(()=>{
        //     updateNav(false);
        //     updateFoot(true);
        //   },0);
        //   // updateNav(false);
        //   // updateFoot(true);
        // }

    return (
      
        <React.Fragment>
        {bLoading && <Loading/>}

        <Switch id="app">
         

        
          <Route path="/home" component={Home}/>
          <Route path="/follow" component={Follow}/>
          <Route path="/column" component={Column}/>
          <Route path="/user" component={User}/>
          <Route path="/weHotel/:id" component={WeHotel}/>
          <Route path="/weHotelDetail/:id" component={WeHotelDetail}/>
                   
          <Route path="/wedScheme/:id" component={WedScheme}/>
          <Route path="/wedSchemeDetail/:id" component={WedSchemeDetail}/>

          <Route path="/weFour/:id" component={WeFour}/>
          <Route path="/weFourDetail1/:id" component={WeFourDetail1}/>
          <Route path="/weFourDetail2/:id" component={WeFourDetail2}/>
          <Route path="/weFourDetail3/:id" component={WeFourDetail3}/>      
          <Route path="/weFourDetail4/:id" component={WeFourDetail4}/>       

          <Route path="/weFlower/:id" component={WeFlower}/>
          <Route path="/weFlowerDetail/:id" component={WeFlowerDetail}/> 

          <Route path="/wePicture/:id" component={WePicture}/> 
          <Route path="/wePictureDetail/:id" component={WePictureDetail}/> 
          
          <Route path="/weFulldress/:id" component={WeFulldress}/> 
          <Route path="/weFulldressDetail/:id" component={WeFulldressDetail}/> 
          

          <Route path="/themeList/:id" component={ThemeList}/>
          <Route path="/themeDetail/:id" component={ThemeDetail}/>
          <Route path="/detail/:id" component={Detail}/>
          <Route path="/searchAll" component={SearchAll}/>

          <Route path="/test" component={Test}/>
          

          <Route path="/Login" component={Login}/>
          <Route path="/Register" component={Register}/>
          <Route path="/Mine" component={Mine}/>
          <Route path="/CollectList" component={CollectList}/>
          <Route path="/questionnaire" component={Questionnaire}/>
          <Route path="/registerHotel" component={RegisterHotel}/>
          <Route path="/messageList" component={MessageList}/>
          <Route path="/messageDetail/:id" component={MessageDetail}/>
          <Route path="/pop" component={Pop}/>
          
          
          <Route path="/Error" component={Error}/>
          <Route path="/Budget" component={Budget}/>
          <Route path="/Gift" component={Gift}/>

          
          <Redirect from='/' to="/home" />
          <Route component={Home}/>
        </Switch>

        {bFoot && <FootBar/>}

      </React.Fragment>
   
      
    );
  }


}

const mapStateToProps = state => ({
  bNav:state.bNav,
  bFoot:state.bFoot,
  bLoading:state.bLoading
});
const mapDispatchToProps = dispatch => ({
  updateNav:(bl)=>{dispatch({type:UPDATE_NAV,payload:bl})},
  updateFoot:(bl)=>{dispatch({type:UPDATE_FOOT,payload:bl})},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
