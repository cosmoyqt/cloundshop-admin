import React,{useState} from 'react'
import LoginImg from '../assets/images/login.jpg'
import { Form, Input, Button, Checkbox ,message} from 'antd';
import '../assets/css/Login.scss'
import {setToken,setSessionStorageToken} from '../utils/auth'
import { UserOutlined ,LockOutlined } from '@ant-design/icons';
function Login (props) {
  const [form] = Form.useForm();
  const [user,setUser] = useState({userName:'yqt',password: 'admin'})
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields().then(res => {
      console.log(res);
      if(res.userName === user.userName ){
        if(res.password === user.password){
          if(res.remember === true){
            setToken('admin',props);
          } else {
            setSessionStorageToken('admin',props)
          }
        } else {
          message.error('密码不正确')
        }
      } else {
        message.error('账号不正确')
      }
    })
      .catch(error => {
        message.error('不合法')
      })
  }
  return (
    <div style={{ backgroundImage: `url(${LoginImg})`, height: '100vh' }}>
      <div className="content">
        <div className="logo">
          我 太 难 了
        </div>
        <div>
          <Form
          form={form}
            initialValues={{ remember: true }}
            className="formbox"
          >
            <Form.Item name="userName" rules={[
                  { required: true, message: 'Please input your username!' },
                  { min: 3, message: '用户名必须大于3位' },
                  { max: 12, message: '用户名最多只能12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能是字母、数字、下划线' }
                ]}>
              <Input
                placeholder="用户名"
                prefix={<UserOutlined />}
                />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
              prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item >
              <Button className="btn" type="primary" htmlType="submit" onClick={(e)=>handleSubmit(e)}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
