import React from 'react'
import Head from 'next/head'

import css from './index.less'

import { Button, Carousel, Menu, Icon, Row, Col } from 'antd'

import { connect } from 'react-redux'

import request from '../utils/request'

import Link from 'next/link'

const { SubMenu } = Menu

const mapStateToProps = state => {
  return {
    color: state.test.color
  }
}

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      hotLesson: [],
      classData: [],
      types: []
    }
  }

  static async getInitialProps() {
    // 获取数据
    let banner = await request.get('/nc/course/home/gettopdata')
    console.log(banner)
    if (banner.status === 0) {
      return {
        slider: banner.message.sliderlist,
        cate: banner.message.catelist
      }
    } else {
      console.log('轮播图接口出错')
      return {}
    }
  }

  componentDidMount() {
    // 发送请求
    this.getTopData()
    this.getClassData()
  }

  getTopData() {
    request.get('/nc/course/home/getTopCourseList').then(res => {
      // console.log(res)
      if (res.status === 0) {
        this.setState({
          hotLesson: res.message
        })
      }
    })
  }

  getClassData() {
    request.get('/nc/course/home/getcourselist').then(res => {
      // console.log(res)
      if (res.status === 0) {
        this.setState({
          classData: res.message.datas,
          types: res.message.types
        })
      }
    })
  }

  render() {
    // console.log(this.props)
    // console.log(this.state)
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>

        <div>
          <div className={css.banner_roll}>
            {/* 1.0实现轮播图-begin 使用antd中的走马灯组件：Carousel */}
            <Carousel autoplay>
              {this.props.slider.map(v => (
                <div key={v.id}>
                  <img src={v.img_url} alt={v.title} />
                </div>
              ))}
            </Carousel>
            {/* 1.0实现轮播图-end */}
            {/* 2.0 左边分类菜单数据-begin 使用antd中的Menu组件 */}
            <div className={css.catelist}>
              <Menu style={{ width: 256 }} mode='vertical'>
                {this.props.cate.map(v1 => (
                  <SubMenu title={v1.title} key={v1.id}>
                    {v1.subcates.map(v2 => (
                      <Menu.ItemGroup title={v2.title} key={v2.id}>
                        {v2.subcates.map(v3 => (
                          <Menu.Item key={v3.id}>{v3.title}</Menu.Item>
                        ))}
                      </Menu.ItemGroup>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </div>
            {/* 2.0 左边分类菜单数据-end */}
          </div>
          <br />
          <div className={css.toplesson}>
            {/* 3.0 精品课程布局-begin */}
            <Row type='flex' align='bottom'>
              <Col span='12'>
                <h2>精品课程</h2>
              </Col>
              <Col className={css.typesli} span='2' offset='10'>
                <a href='#'>查看全部</a>
              </Col>
            </Row>
            <br />
            <ul>
              {this.state.hotLesson &&
                this.state.hotLesson.map(v => (
                  <Link href={`/detail?lid=${v.id}`} key={v.id}>
                    <li className={css.recom_item}>
                      <p>
                        <img src={v.img_url} width='100%' alt='' />
                        <span className={css.lab}>HOT</span>
                      </p>
                      <ul>
                        <li style={{ height: 36 }}>{v.title}</li>
                        <li className={css.li2}>
                          <span>{v.lesson_level}</span> <em> · </em> {v.click}
                          人在学习
                        </li>
                      </ul>
                    </li>
                  </Link>
                ))}
            </ul>
            {/* 3.0 精品课程布局-end */}
            {/* 4.0 分类分组课程数据-begin */}
            <br /> <br />
            {this.state.classData &&
              this.state.classData.map(v => (
                <div key={v.id}>
                  <Row type='flex' align='bottom'>
                    <Col span='8'>
                      <h2>{v.title}</h2>
                    </Col>
                    <Col span='8' className={css.typesli}>
                      <ul>
                        {this.state.types &&
                          this.state.types.map((v, i) => (
                            <li key={v.tid}>
                              <a className={i === 0 ? css.active : ''} href='#'>
                                {v.title}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </Col>
                    <Col className={css.typesli} span='2' offset='6'>
                      <a href='#'>查看全部</a>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row type='flex' align='top'>
                    <Col span='5'>
                      {/* 左边图片 */}
                      <img src={v.img_url} width='228' height='392' alt='' />
                    </Col>
                    <Col span='19'>
                      <Row>
                        {/* 上边图片 */}
                        <Col span='24'>
                          <img
                            src={v.img1_url}
                            width='957'
                            height='100'
                            alt=''
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span='24'>
                          <ul>
                            {v.courseList &&
                              v.courseList.map(j => (
                                <li className={css.recom_item} key={j.id}>
                                  <a href='#'>
                                    <p>
                                      <img
                                        src={j.img_url}
                                        width='100%'
                                        height='160'
                                        alt=''
                                      />
                                      <span className={css.lab}>HOT</span>
                                    </p>
                                    <ul>
                                      <li style={{ height: 36 }}>{j.title}</li>
                                      <li className={css.li2}>
                                        <span>{j.lesson_level}</span>{' '}
                                        <em> · </em> {j.click}人在学习
                                      </li>
                                    </ul>
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              ))}
            {/* 4.0 分类分组课程数据-end */}
          </div>
          <style>{`
            /*首页轮播和分类begin*/ 
                 /*覆盖antd轮播图小图标的位置，只有在当前组件有效*/
                .slick-dots {
                    position: relative !important;
                    bottom:40px !important;
                }
                /*重写antd一级菜单样式*/ 
                .ant-menu{
                    background: rgba(0, 0, 0, 0.2) !important;
                    color:#fff;
                }
                /*重写二级菜单样式*/ 
                .ant-menu-sub{
                    background: #fff !important;
                    color:#000;
                }
                .ant-menu-submenu-arrow{
                    color:#fff !important;                  
                }
                .ant-menu-submenu-arrow::after, .ant-menu-submenu-arrow::before{                   
                    background-image:none !important;
                }
                .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
                    border-right:none !important;
                }
                .ant-menu-item-group-list{
                    width:500px
                }
                .ant-menu-item-group-list li{
                    display:inline-block !important;
                }
                /*首页轮播和分类end*/ 
            `}</style>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)
