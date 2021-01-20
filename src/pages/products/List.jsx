import React, { useEffect,useState} from 'react'
import { Button, Popconfirm,Card } from 'antd'
import Table from '@/components/Table';
import axios from '@/utils/api';
function List (props) {
  const [productList,setProductList] = useState([]);
  const getproduct = ()=>{
    axios.products.getProductsList().then(res => {
      setProductList(res.data)
    })
  }
  useEffect(()=>{
    getproduct()
  },[])
  const columns = [
    {
      title: "序号",
      dataIndex: 'product_id',
      width: 80,
      align: 'center',
    },
    {
      title: '名字',
      dataIndex: 'product_name',
      width: 180,
    },
    {
      title: '价格',
      dataIndex: 'product_price'
    },
    {
      title: '商品封面图',
      dataIndex: 'pproduct_imgs',
      render:(record) => 
      {
        let img = record.split(',');
        return ( <img src={img[0]} height="100px" width="100px" style={{objectFit:'cover'}} />)
      }
    },
    {
      title:"商品描述",
      dataIndex:'product_description',
      width:'300px'
    },
    {
      title:"二级分类",
      dataIndex:'series_name',
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return (
          <div>
            <Button size="small" type="primary" onClick={()=>props.history.push("/admin/products/edit/"+record.product_id)}>修改</Button>
            <Popconfirm
              title='确定删除此项?'
              okText="确定"
              cancelText="取消"
            // onConfirm={confirm}
            >
              <Button size="small" onClick={()=>axios.products.deleteProduct(record.product_id).then(res=>{getproduct()})} type="danger" style={{ margin: "0 1rem" }}>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <div>
            <Card title="商品列表" extra={<Button type="primary" onClick={()=>{props.history.push("/admin/products/edit")}}>新增</Button>}>
        <Table datalist={productList} rowKey="product_id" columns={columns}></Table>
        </Card>
    </div>
  )
}

export default List