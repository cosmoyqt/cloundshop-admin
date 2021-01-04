import axios from 'axios';
import { message } from 'antd';

axios.defaults.baseURL ='http://127.0.0.1:7001/';
axios.defaults.withCredentials = true;
// 请求超时时间
axios.defaults.timeout = 60000;
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(

    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            if (response.request.responseURL.indexOf('/login') === -1) {
                return Promise.resolve(response);
            }

        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况 
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 302:
                    message.error({
                        content: '更换session',
                        duration: 1
                    })
                    break;
                    // 401: 未登录    
                    // 未登录则跳转登录页面，并携带当前页面的路径    
                    // 在登录成功后返回当前页面，这一步需要在登录页操作。    
                case 401:
                    break;
                    // 403 token过期    
                    // 登录过期对用户进行提示    
                    // 清除本地token和清空vuex中token对象    
                    // 跳转登录页面    
                case 403:
                    message.error({
                        content: '登录过期，请重新登录',
                        duration: 1
                    })
                    break;
                    // 404请求不存在    
                case 404:
                    message.error({
                        content: '网络请求不存在',
                        duration: 2
                    })
                    break;
                    // 其他错误，直接抛出错误提示    
                default:
                    message.error({
                        content: error.response.data.message,
                        duration: 2
                    })
            }
            return Promise.reject(error.response);
        }
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
            })
            .then(res => {
                if(res.data.code === 0){
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params, headers) {
    return new Promise((resolve, reject) => {
        //const session = store.getters['auth/userStore/getSession'];
        // util.setCookie('JSESSIONID', session)
        axios.post(url, params, {
                headers: {
                    "Content-Type": !headers ? "application/json;charset=UTF-8" : headers,
                    //"Cookie": 'JSESSIONID='+session
                }
            })
            .then(res => {
                if (res.data.code === 0) {
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err.data)
            })
    });
}