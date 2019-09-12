import React, { Component } from 'react'
import request from '../../utils/request'
import { saveUser } from '../../utils/storage'

import { Form, Icon, Input, Button, Checkbox, message } from 'antd'

class Login extends Component {
  constructor() {
    super()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        let res = await request.post('/nc/common/account/login', values)
        console.log(res)
        if (res.status === 0) {
          message.success('登录成功', 1, () => {
            // 登录成功后保存用户信息
            // console.log(saveUser)
            saveUser(res.message.user)
            // 跳转到首页
            window.location = '/'
          })
        } else {
          message.error(res.message)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className='login'>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('user_name', {
              rules: [{ required: true, message: '用户名空不了!' }]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='输入用户名'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能空!' }]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='输入密码'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'>
              登录
            </Button>
          </Form.Item>
        </Form>
        <style>{`
          .login-form {
            max-width: 300px;
          }
          .login-form-forgot {
            float: right;
          }
          .login-form-button {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default Form.create({})(Login)
