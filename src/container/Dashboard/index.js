import React, { Component } from 'react';
import { Switch, Route, Link, withRouter, Redirect} from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logoutAccount } from 'actions';

import { AuthHelper, redirectByRole } from 'utils/auth';
import SideMenu from './components/SideMenu'


// view / change menu from props.account.metadata.roles
const DashboardAdmin = () => (
  <div>admin view</div>
)
const DashboardPost = () => (
  <div>create post view</div>
)

const DashboardNotFound = () => (
  <div>Not Found</div>
)

const CheckAuth = ({ component: Component, pageRole, ...rest }) => (
  //check (isLogin&&metadata.roles=role):go?redirect
  (AuthHelper.checkRole(pageRole)) ? (
    <Route {...rest} render={ props => (
      <Component {...props} pageRole={pageRole} />
    )}/>
  ) : (
    <Redirect to="/login" />
  )
)

class Dashboard extends Component {
  handleLogout = () => {
    this.props.dispatchLogoutAccount();
    this.props.history.push('/login')
  }
  componentWillMount() {
    redirectByRole(this.props.role, this.props.history)
  }
  render() {
    const {
      match: {
        url
      }
    } = this.props
    return (
      <div>
        Dashboard url {url}<br/>
        {
          // JSON.stringify(this.props)
        }

        <Link to={`${url}`}>dashboard</Link> <br/>
        <Link to={`${url}/post`}>post</Link> <br/>
        <Link to={`${url}/404`}>404</Link> <br/>

        <button onClick={this.handleLogout}>LogOut</button>

        <hr/>

        <div>sidemenu</div>
        <SideMenu />

        <hr/>

        <div>
          <Switch>
            <CheckAuth exact path="/dashboard" component={DashboardAdmin} pageRole="2" />
            <CheckAuth path="/dashboard/post" component={DashboardPost} pageRole="2"/>
            <Route component={DashboardNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    account: state.account,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchLogoutAccount: logoutAccount,
  },dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Dashboard));
