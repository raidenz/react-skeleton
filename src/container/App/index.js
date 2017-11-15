import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';

import Blog from './components/Blog'

import PageHome from 'container/PageHome'
import PageAbout from 'container/PageAbout'
import PageContact from 'container/PageContact'
import Login from 'container/Login'
import PageNotFound from './components/PageNotFound'

import Dashboard from 'container/Dashboard'

import { AuthHelper } from 'utils/auth';

const PageBlog = (props) => (
  <div>
    Blog content
    <Switch>
      <Route path="/blog" component={SinglePost} />
      <Route path="/blog/post" component={SinglePost} />
    </Switch>
  </div>
)

const SinglePost = () => (
  <div>
    Post content
  </div>
)

const BlogTemplate = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Blog>
      <Component {...props}/>
    </Blog>
  )}/>
)

const Auth = ({ component: Component, auth, ...rest }) => (
  //check isLogin:go?redirect
  AuthHelper.isLoggedIn() ? (
    <Route {...rest} render={ props => (
      <Component {...props} auth={auth} />
    )}/>
  ) : (
    <Redirect to="/login" />
  )
)

class App extends Component {
	render() {
		return (
      <Switch>
        <BlogTemplate exact path="/" component={PageHome}/>
        <BlogTemplate path="/post" component={SinglePost} />
        <BlogTemplate path="/blog" component={PageBlog} />
        <BlogTemplate path="/about" component={PageAbout} />
        <BlogTemplate path="/contact" component={PageContact} />
        <Route path="/login" component={Login} />
        <Auth path="/dashboard" component={Dashboard} auth="2" />
        <BlogTemplate component={PageNotFound} />
      </Switch>
		);
	}
}

export default withRouter(App);
