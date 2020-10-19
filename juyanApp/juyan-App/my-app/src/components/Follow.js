import React,{Component} from 'react';

import '../assets/css/follow.css';

import {connect} from "react-redux";
import asyncAction from "../store/asyncAction";

import { Button, List } from 'antd-mobile';












class Follow extends Component{
  constructor(){
    super();
    this.state={
        date: '',
    };
  }
async getLogin(){
  console.log("条件出发")
  const res =await _login()
  console.log("要显示的数据".res)
}

  componentDidMount(){

  }
  render(){
    let {followData} = this.props;
 
    return (
        <div>
           <Button type="primary">Primary</Button>
        </div>
    )
  }
}



const mapStateToProps = state => ({
  followData:state.followData
});
const mapDispatchToProps = dispatch => ({
  get:(url)=>{dispatch(asyncAction(dispatch,url,'UPDATE_FOLLOW_DATA'))}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Follow);