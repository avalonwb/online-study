import App, { Container } from 'next/app'
import React from 'react'
import Layout from '../layouts/layout'
import { initStore, persistor } from '../store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'

require('es6-promise').polyfill() //保证使低版本浏览器（IE<9）中可以正常使用promise
import 'isomorphic-fetch'

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Layout Component={Component} pageProps={pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(MyApp)
