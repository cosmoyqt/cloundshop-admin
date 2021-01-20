import {get,post} from './http';

export default {
  // 商品模块
  login:opt => post('/admin/checkLogin',opt),
  category:{
    getCategoryList: opt => get('/admin/getCategoryList'), //获取项目一级分类
    updataCategoryList: opt => post('/admin/updateCategory',opt), //修改项目一级分类
    deleteCategory: opt => get(`/admin/deleteCategory/${opt}`), //删除项目一级分类
    addCategory: opt => post(`/admin/addCategory/`,opt), //添加项目一级分类
    getSecondaryList: opt => get('/admin/getSecondaryList'), //获取项目二级分类
    updateSecondary: opt => post('/admin/updateSecondary',opt), //修改项目二级分类
    addSecondary: opt => post(`/admin/addSecondary/`,opt), //添加项目二级分类
    deleteSecondary: opt => get(`/admin/deleteSecondary/${opt}`), //删除项目二级分类
  },
  products:{
    getProductsList: opt => get('/admin/getProductsList'), //获取产品列表
    uploads: opt => post('/api/uploads',opt), //上传图片
    addProducts: opt => post("/admin/addProducts",opt), // 增加产品
    getProduct: opt => get(`/admin/getProduct/${opt}`), //获取单个产品
    updateProduct: opt => post("/admin/updateProduct",opt), // 修改
    deleteProduct: opt => get(`/admin/deleteProduct/${opt}`), //删除产品
  }
}