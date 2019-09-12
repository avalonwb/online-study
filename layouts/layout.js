import React from 'react'

import Header from '../container/layout/Header'

import Footer from '../container/layout/Footer'

class Layout extends React.Component {
  render() {
    let { Component, pageProps } = this.props
    return (
      <div className='layout'>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    )
  }
}

export default Layout
