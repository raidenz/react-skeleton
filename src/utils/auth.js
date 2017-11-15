import Cookies from 'js-cookie';

const COOKIE_KEY = '__rfsmp__';

export const AuthHelper = {
  setUserData: (userdata, expiresInDay = 1) => {
    Cookies.set(COOKIE_KEY, JSON.stringify(userdata), {
      expires: expiresInDay
    });
  },
  getUserData() {
    let cookie = Cookies.get(COOKIE_KEY);
    if (!cookie) return false
    return JSON.parse(cookie);
  },
  logout(){
    Cookies.remove(COOKIE_KEY);
  },
  isLoggedIn(){
    const getCookie = this.getUserData()

    if (!getCookie.token) return false
    return true;

  },
  getToken(){
    const getCookie = this.getUserData()
    return getCookie.token;
  },
  getMyId(){
    const getCookie = this.getUserData()
    return getCookie.id;
  },
  getTest() {
    const getCookie = this.getUserData()
    return getCookie.token;
  },
  checkRole(role) {
    const getCookie = this.getUserData()
    return (getCookie.role === role) ? true : false
  },
}

export const redirectByRole = (role, history) => {
  const checkRole = AuthHelper.getUserData()
  // return checkRole
  console.log('checking', checkRole.role)
  switch(checkRole.role){
    case "2":
      history.push('/dashboard')
    break
    default:
      history.push('/login')
  }
}

export const roleMenus = () => {
  const checkRole = AuthHelper.getUserData()
  let menus = [];
  switch(checkRole.role){
    case "2":
      menus = [
        {
          name:'dashboard',
          link:'/dashboard'
        },
        {
          name:'post',
          link:'/dashboard/post'
        }
      ]
    break
    default:
      menus = []
  }
  return menus
}
