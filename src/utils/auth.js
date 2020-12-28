export function isLogined () {
  if(localStorage.getItem('token') || sessionStorage.getItem('token')){
    return true;
  } 
  return false;
}
export function setToken(token,props) {
  localStorage.setItem('token',token)
  props.history.push('/admin')
}
export function setSessionStorageToken(token,props){
  sessionStorage.setItem('token',token)
  props.history.push('/admin')
}
export function clearToken(){
  if(localStorage.getItem('token')){
    localStorage.removeItem('toekn')
  }
  if (sessionStorage.getItem('token')) {
    sessionStorage.removeItem('token')
  }
}