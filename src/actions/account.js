/**
 * Relativity test point
 */
import { serverEndpoint, generateJwtHeader } from 'utils/api';
import { AuthHelper } from 'utils/auth';

const ERROR = 'account/ERROR';
const FETCHING = 'account/FETCHING';
const REQUEST_SIGNIN = 'account/REQUEST_SIGNIN';
const REQUEST_SIGNOUT = 'account/REQUEST_SIGNOUT';
const SET_ACCOUNT = 'account/SET_ACCOUNT';
const SET_SETTING = 'account/SET_SETTING';
const LOGOUT = 'account/LOGOUT';

export const accountActions = {
  ERROR,
  REQUEST_SIGNIN,
  REQUEST_SIGNOUT,
  FETCHING,
  SET_ACCOUNT,
  SET_SETTING,
  LOGOUT,
};

export const fetchingAccount = () => ({
  type: FETCHING
});

export const setAccount = (payload) => ({
  type: SET_ACCOUNT,
  payload,
});

export const logoutAccount = () => (dispatch, getState) => {
  AuthHelper.logout();
  const requestHeaders = generateJwtHeader(getState());
  const options = {
    headers: requestHeaders,
  };
  fetch(`${serverEndpoint}/auth/management/logout`, options) //new server
    .then(res => res.json())
    .then(json => {
      if (json.status === 'success') {
        dispatch({ type: LOGOUT });
      }
    })
};

export const errorAccount = (message) => ({
  type: ERROR,
  message
});
// set setting to cookie
export const setSettingData = (payload) => ({
  type: SET_SETTING,
  payload
});

export const setSetting = (data) => dispatch => {
  const userdata = AuthHelper.getUserData();
  const newdata = {
    fullName: data.get('fullName'),
    photoProfile: data.get('photoProfile')
  }
  const payload = {...userdata, ...newdata}
  AuthHelper.setUserData(payload);
  console.log(payload)
  dispatch({
    type: SET_SETTING,
    payload
  })
};

export const requestSignin = (email, password) => dispatch => {
  const payload = {
    email: email,
    password: password,
  };

  // let sentdata = new FormData();
  // // sentdata.append( "json", JSON.stringify( payload ) );
  // sentdata.append( "email", email );
  // sentdata.append( "password", password );

  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  dispatch(fetchingAccount());
    fetch(`${serverEndpoint}/auth/management/login`, options) //new server

    .then(res => res.json())
    .then(json => {
      if (json.status === 'success') {
        AuthHelper.setUserData(json.data);
        dispatch(setAccount(json.data));
      }
      else if (json.status === 'error' ) {
        dispatch(errorAccount(json.message));
      }
      else if (json.status === 'fail' ) {
        dispatch(errorAccount(json.message));
      }
    })
}
