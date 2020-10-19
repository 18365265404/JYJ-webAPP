import React from 'react';
import '../assets/css/loading.css'

import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
class Loading extends React.Component {
  componentDidMount() {
    Toast.loading('Loading...', 30, () => {
      console.log('Load complete !!!');
    });

    setTimeout(() => {
      Toast.hide();
    }, 50);
  }
  render() {
    return (
     <div></div>
    );
  }
}



export default Loading;