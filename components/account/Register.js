import React, { Component } from 'react'
import request from '../../utils/request'

import { Form, Input, Row, Col, Button, Icon, message } from 'antd'

let timer = null

let counter = 5

class Register extends Component {
  constructor() {
    super()
    this.state = {
      isClick: false,
      txt: '获取验证码'
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('表单收集的数据', values)
        // 为了防止用户无视用户名已被注册提示继续提交 应在交验完所有表单项的同时 再校验一遍用户名是否已经被注册
        this.checkPhone(async () => {
          // 提交表单数据
          let res = await request.post('/nc/common/account/register', {
            user_name: values.user_name,
            password: values.password,
            sns_code: values.sns_code,
            role: 0
          })
          if (res.status === 0) {
            message.success('注册成功', 1, () => {
              // 刷新页面
              window.location = window.location
            })
          } else {
            message.error(res.message)
          }
        })
      }
    })
  }

  checkPhone = async callback => {
    const phone = this.props.form.getFieldValue('user_name')
    // console.log(phone)
    let res = await request.post('/nc/common/account/checkuser', {
      username: phone
    })
    if (res.status === 1) {
      message.error('服务器处理异常')
    } else {
      // 服务器处理成功
      if (res.message.isRegister) {
        this.props.form.setFields({
          user_name: {
            value: phone,
            errors: [new Error('用户名已经被抢了！')]
          }
        })
      } else {
        if (typeof callback === 'function') {
          callback()
        }
      }
    }
  }

  checkPassword = (rule, value, callback) => {
    // console.log(value)
    const password = this.props.form.getFieldValue('password')
    // console.log(password)
    if (value === password || value === '') {
      // 验证通过直接调用callback
      callback()
    } else {
      // 不通过调用callback传提示文字
      callback('两次密码不一致啊！')
    }
  }

  getCaptcha = async () => {
    const phone = this.props.form.getFieldValue('user_name')
    let res = await request.post('/nc/common/account/snscode', {
      username: phone
    })
    if (res.status === 0) {
      message.success('发送成功')
      this.setTimer()
    } else {
      message.error('服务器那边有事')
      this.setTimer()
    }
  }

  setTimer() {
    // 禁用按钮
    this.setState({
      isClick: true
    })

    timer = setInterval(() => {
      counter--
      if (timer && counter <= 0) {
        // 启用按钮 重置文本
        this.setState({
          txt: '获取验证码',
          isClick: false
        })
        // 重置计数
        counter = 5
        clearInterval(timer)
      } else {
        this.setState({
          txt: `${counter}秒后再次获取`
        })
      }
    }, 1000)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('user_name', {
            rules: [
              { required: true, message: '请输入手机号' },
              { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '不是个手机号！' }
            ]
          })(
            <div>
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='手机号'
                onBlur={this.checkPhone}
              />
              <Button
                type='primary'
                disabled={this.state.isClick}
                onClick={this.getCaptcha}>
                {this.state.txt}
              </Button>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              prefix={
                <Icon type='coffee' style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder='密码'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm_password', {
            rules: [
              { required: true, message: '请再输入密码' },
              { validator: this.checkPassword }
            ]
          })(
            <Input
              prefix={<Icon type='sync' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='确认一下密码'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('sns_code', {
            rules: [{ required: true, message: '请输入验证码' }]
          })(
            <Input
              prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='输入验证码'
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'>
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({})(Register)
