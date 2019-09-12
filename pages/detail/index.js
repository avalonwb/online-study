import React, { Component } from 'react'
import { Icon, Row, Col, Tabs, Collapse, message } from 'antd'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import router from 'next/router'
import request from '../../utils/request'
import css from './index.less'

const { TabPane } = Tabs
const { Panel } = Collapse

class Detail extends Component {
  constructor() {
    super()
    this.state = {
      breaf: [],
      sections: []
    }
  }

  static async getInitialProps({ query }) {
    // console.log(query.lid)
    let res = await request.get(
      `/nc/course/courseDetial/getCourseDetial/${query.lid}`
    )
    if (res.status === 0) {
      return {
        detail: res.message.CourseDetial,
        bread: res.message.BreadCrumbs
      }
    }
  }

  componentDidMount() {
    let url = `/nc/course/courseDetial/getOutline/${
      this.props.router.query.lid
    }`
    request.get(url).then(res => {
      console.log(res)
      if (res.status === 0) {
        let len = res.message.filter(v => v.parent_id === 0).length
        let arr = []
        for (let i = 0; i < len; i++) {
          arr.push(i.toString())
        }
        this.setState({
          breaf: res.message,
          sections: arr
        })
      }
    })
  }

  addCart = async id => {
    // console.log(id)
    let res = await request.post('/ch/shop/postshopcar', {
      goods_id: id
    })
    if (res.status === 2) {
      message.info(res.message)
      // 跳转至登录页
      router.push({ pathname: '/account' })
    } else if (res.status === 1) {
      message.error(res.message)
    } else if (res.status === 0) {
      message.success(res.message.text)
      this.props.changeCartCount(res.message.count + 1)
    }
  }

  render() {
    // console.log(this.props)
    let { detail, bread } = this.props
    return (
      <div style={{ minHeight: 800 }}>
        {/* 1.0 课程详情banner部分-begin */}
        <div className={css.article_banner}>
          <div className={css.banner_bg} />
          <div className={css.banner_info}>
            <div className={css.banner_left}>
              <p>
                {bread.map((v, i) => (
                  <span key={i}>
                    {i === bread.length - 1 ? v.title : v.title + ' / '}
                  </span>
                ))}
              </p>
              <p className={css.tit}>{detail.title}</p>
              <p className={css.pic}>
                <span className={css.new_pic}>
                  {'优惠价: ' + detail.sell_price}
                </span>
                <span className={css.old_pic}>
                  {'市场价: ' + detail.market_price}
                </span>
              </p>
              <p className={css.info}>
                <a href='#' onClick={() => this.addCart(detail.id)}>
                  加入购物车
                </a>
                <span>
                  <em>难度等级</em>
                  {detail.lesson_level}
                </span>
                <span>
                  <em>课程时长</em>
                  {detail.lesson_time}
                </span>
                <span>
                  <em>评分</em>
                  {detail.lesson_star}
                </span>
                <span>
                  <em>授课模式</em>
                  {detail.leson_type}
                </span>
              </p>
            </div>
            <div className={css.banner_rit}>
              <p>
                <img src='/static/img/widget-video.png' alt='' />{' '}
              </p>
              <p className={css.vid_act}>
                <span>
                  <Icon type='plus-square' theme='outlined' />
                  收藏 23{' '}
                </span>
                <span>
                  分享 <Icon type='share-alt' theme='outlined' />
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* 1.0 课程详情banner部分-end */}
        {/* 2.0 课程详情、课程大纲、授课老师、常见问题-begin */}
        <div className={css.article_cont}>
          <Row>
            <Col span='20'>
              <div className={css.tit_list}>
                <Tabs defaultActiveKey='1'>
                  <TabPane
                    tab={
                      <span>
                        <Icon type='file-text' />
                        课程详情
                      </span>
                    }
                    key='1'>
                    {/*
            dangerouslySetInnerHTML = {{ __html:this.props.courseInfo.CourseDetial.content }}
            可以实现html代码的渲染
          */}
                    <div
                      className={css.tabp}
                      dangerouslySetInnerHTML={{ __html: detail.content }}
                    />
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Icon type='bars' />
                        课程大纲
                      </span>
                    }
                    key='2'>
                    <div className={css.tabp}>
                      <Collapse defaultActiveKey={this.state.sections}>
                        {this.state.breaf &&
                          this.state.breaf
                            .filter(item => item.parent_id === 0)
                            .map((v1, i1) => (
                              <Panel header={v1.section_name} key={i1}>
                                <Row>
                                  {this.state.breaf &&
                                    this.state.breaf
                                      .filter(v2 => v2.parent_id === v1.id)
                                      .map(item => (
                                        <Col
                                          span={12}
                                          className={css.sesionUl}
                                          key={item.id}>
                                          <div>
                                            <a href='#'>{item.section_name}</a>
                                          </div>
                                        </Col>
                                      ))}
                                </Row>
                              </Panel>
                            ))}
                      </Collapse>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Icon type='usergroup-add' />
                        授课老师
                      </span>
                    }
                    key='3'>
                    <div className={css.tabp}>
                      <Row>
                        <Col span={3}>
                          <img
                            src={detail.teacher_img}
                            alt={detail.teacher_name}
                          />
                        </Col>
                        <Col span={21}>
                          <Row>
                            <Col span={24}>{detail.teacher_name}</Col>
                          </Row>
                          <Row>
                            <Col span={24}>{detail.teacher_desc}</Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Icon type='question-circle' />
                        常见问题
                      </span>
                    }
                    key='4'>
                    <div
                      className={css.tabp}
                      dangerouslySetInnerHTML={{
                        __html: detail.common_question
                      }}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </Col>

            <Col span='4'>
              <div className={css.tit_list}>
                <Tabs defaultActiveKey='1'>
                  <TabPane
                    tab={
                      <span>
                        <Icon type='book' />
                        学成在线云课堂
                      </span>
                    }
                    key='1'>
                    <p className={css.tabp}>
                      学成在线整合线下优质课程和纯熟的教学经验，开展在线教育，突破空间、地域、时间、费用的限制，让优质教育资源平等化。
                    </p>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
        {/* 2.0 课程详情、课程大纲、授课老师、常见问题-end */}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCartCount: count => {
      // console.log(count)
      dispatch({
        type: 'CHANGE_COUNT',
        payload: count
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Detail))
