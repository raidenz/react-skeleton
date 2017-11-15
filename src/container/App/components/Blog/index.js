import React from 'react';
import Header from '../Header'
import Footer from '../Footer'

const Blog = (props) => (
  (
    <div>
      <Header />
        <div className="content">
          <div className="container">
            {props.children}
          </div>
        </div>
      <Footer />
    </div>
  )
)

export default Blog
