import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
const asyncAction=(dispatch,url,type)=>{
  fetch(url).then(
    res=>res.json()
  ).then(
    data=>{
      setTimeout(()=>{
        dispatch({type:'UPDATE_LOADING',payload:false});//状态请求
        dispatch({type:type,payload:data});//状态请求
        Toast.hide();
      },50)
    }
  );

  return {type:'UPDATE_LOADING',payload:true}
};

export default asyncAction