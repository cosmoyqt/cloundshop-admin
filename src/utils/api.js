import {get,post} from './http';

export default {
  // 商品模块
  goods:{
    getProductsList: opt => get('/admin/api/getProductsList'), //获取项目活动列表
  }
}