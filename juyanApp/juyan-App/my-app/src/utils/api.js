import axios from 'axios'
import {getCookie} from "../utils/utils";
import qs from "qs"
import url from '../utils/url';
axios.defaults.withCredentials = true;
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';



axios.interceptors.request.use(config=> {
  return config;
}, err=> {

  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Toast.success('Load success !!!', 1);
    return;
  }
  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    Toast.fail('请求错误', 1);
  } else if (err.response.status == 403) {
    Toast.fail('请求错误', 1);
  }else if (err.response.status == 400) {
    
    // Toast.fail('请求错误', 1);
    // window.location.href = '/Error';
    
  }else {
    Toast.fail('未知错误', 1);
    // window.location.href = '/Error';
  }
  return Promise.resolve(err);
})

var base = url.serverUrl;
// let userToken=``;



export const postRequest = (url, params) => {
  
  return axios({
    method: 'post',                                 
    url: `${base}${url}?keyword=${getCookie("city")}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    // headers: {
        
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
    // headers: {'token': getCookie("token") }
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'

    }
    // beforeSend: function(request) {
    //     request.setRequestHeader(Authorization, "666"); }
    // headers: {'Authorization': 'token' + 123456}
  });
}

// 不携带默认的参数
export const postRequestNocity = (url, params) => {
  return axios({
    method: 'post',                                 
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'

    }

  });
}

/** 带token登陆状态的*/ 
export const postReqLogin = (url, params) => {
  return axios({
    method: 'post',                                 
    url: `${base}${url}?clientToken=${getCookie("clientToken")}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'

    }

  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url) => {
  return axios({
      
    method: 'get',
    url: `${base}${url}`,
    
  });
}