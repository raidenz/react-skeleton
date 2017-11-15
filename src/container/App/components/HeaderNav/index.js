import React from 'react';
import { Link } from 'react-router-dom'

const HeaderNav = (props) => (
  <div className="nav">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/post">Post</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </div>
)

export default HeaderNav
