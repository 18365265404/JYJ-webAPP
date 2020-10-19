import React,{Component} from 'react';
import { Upload, Icon, Modal,message } from 'antd';

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            // phoneStyles:{"position": "fixed","right": "0.5rem","top":"5rem","background": "rgb(0, 110, 255)","color": "red","borderRadius": "50%","textAlign": "center","lineHeight": "1rem","height": "1rem","width": "1rem"}
            disabled: true,

            previewVisible: false,
            previewImage: '',
            fileList: [{
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        })

    }

    beforeUpload(file) {
      this.setState
      this.setState(({ fileList }) => ({
        fileList: [...fileList, file],
      }));
      return false
    }
    handleCancel = () => this.setState({ previewVisible: false })
    
      handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
    
      handleChange = ({ fileList }) => this.setState({ fileList })
      

    onChange = (e) => {
        const length = e.target.value.length;
        if (length >= 4) {
          this.setState(() => ({ disabled: false }))
        } else if (!this.state.disabled) {
          this.setState(() => ({ disabled: true }))
        }
      }
    photo(){
      // plus.camera.getCamera( index ); 
    }


    render(){
      
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );

        const label = this.state.disabled ? 'Disabled' : 'Submit';
        function UserGreeting(props) {
            return <h1>Welcome back!</h1>;
          }
          
          function GuestGreeting(props) {
            return <h1>Please sign up.</h1>;
          }
        function Greeting(props) {
            const isLoggedIn = props.isLoggedIn;
            if (isLoggedIn) {
              return <UserGreeting />;
            }
            return <GuestGreeting />;
          }
        return (
            <div>


        <div className="clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload.bind(this)}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 6 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                
              </div>


                <Greeting isLoggedIn={true} />

                <div style={Object.assign({}, styles.phoneStyles, !this.state.disabled && styles.phones)}
                      className="home-drag"  id="phone"><a href="tel:num">110</a>
                 </div>
                <button
                    style={Object.assign({}, styles.button, !this.state.disabled && styles.buttonEnabled)}
                    disabled={this.state.disabled}
                    >{label}
                </button>

                {/* <input type="file" id='image' accept="image/*" capture='camera'/> */}

                
                    <input
                    style={styles.input}
                    onChange={this.onChange}
                    />
  

            </div>
        )
    }
}
const styles = {
    phoneStyles:{
        position: "fixed",
        right: "0.5rem",
        top:"5rem",
        background: "rgb(0, 110, 255)",
        color: "red",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "1rem",
        height: "1rem",
        width: "1rem"
    },
    phones:{
        position: "fixed",
        right: "0.5rem",
        top:"5rem",
    },
    input: {
      width: 200,
      outline: 'none',
      fontSize: 20,
      padding: 10,
      border: 'none',
      backgroundColor: '#ddd',
      marginTop: 10,
    },
    button: {
      width: 180,
      height: 50,
      border: 'none',
      borderRadius: 4,
      fontSize: 20,
      cursor: 'pointer',
      transition: '.25s all',
    },
    buttonEnabled: {
      backgroundColor: '#ffc107',
      width: 220,
    }
  }
