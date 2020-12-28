import Mock from 'mockjs';

// 请求商品列表
Mock.mock('http://localhost:3000/admin/api/getProductsList','get',{
     "status":200,
     'result|20':[{
      "id|+1":1,
      "goodsName":"@cname",
      'goodsImg': '@image',
      "goodsPrice":'@float(1, 100, 3, 6)',
      "goodsDescription":"@paragraph(2)"
     }]
})