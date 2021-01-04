import {get,post} from './http';

export default {
  // 商品模块
  login:opt => post('/admin/checkLogin',opt),
  goods:{
    getCategoryList: opt => get('/admin/getCategoryList'), //获取项目活动列表
  }
}