import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestSignin } from 'actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: false,
      email: '',
      password:''
    }
  }
  handleLogin = e => {
    const {email,password} = this.state
    this.props.dispatchRequestSignin(email, password);
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    },
    () => {console.log(this.state)}
    )
  }
  handleFormSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('updateprops', nextProps)
    if(nextProps.isLoggedIn){
      // user is login
      // read role then redirect
      // nextProps.metadata.roles
      switch(nextProps.metadata.roles){
        case "2":
          this.props.history.push('/dashboard')
        break
        default:
      }
    }
  }
  render() {
    return (
      <div id="page-login">
        <div className="login">
          Login page <br/>
          <hr/>
          <form action="" onSubmit={this.handleFormSubmit}>
            <input type="text" name="email" onChange={this.handleInput} /> <br/>
            <input type="password" name="password" onChange={this.handleInput} />
            <button onClick={this.handleLogin}>test login</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.account,
  account: state.account,
});


const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchRequestSignin: requestSignin,
  },dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Login));
