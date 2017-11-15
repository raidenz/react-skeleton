import { accountActions } from 'actions';
const initialState = {
  isLoggedIn: false,
  token: '',
  hasError: false,
  error: '',
  metadata: {
    id: '',
    email: '',
    photoProfile: '',
    firstName: '',
    lastName: '',
    roles: [],
  },
}

export default (state = initialState, action) => {
  switch(action.type) {
    case accountActions.ERROR: {
      return {
        ...state,
        hasError: true,
        error: action.message,
      };
    }
    case accountActions.SET_ACCOUNT: {
      const { payload } = action;

      return {
        ...state,
        hasError: false,
        error: '',
        isLoggedIn: true,
        metadata: {
          email: payload.email,
          firstName: payload.fullName,
          id: payload.id,
          photoProfile: payload.photoProfile,
          // roles: [...payload.roles.map(role => ({ id: role.id, name: role.name }))],
          roles: payload.role,
        },
        token: payload.token,
      }
    }
    case accountActions.SET_SETTING: {
      const { payload } = action;
      return {
        ...state,
        metadata: {
          email: payload.email,
          firstName: payload.fullName,
          id: payload.id,
          photoProfile: payload.photoProfile,
          roles: payload.role,
        }
      }
    }
    case accountActions.LOGOUT: {
      return {
        ...initialState,
      }
    }
    default:
      return state;
  }
}
