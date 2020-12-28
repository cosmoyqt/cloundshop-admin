import React, { useEffect,useState} from 'react'
import { Card, Button, Table, Popconfirm, Spin } from 'antd'
import api from '../../utils/api';
import mockdata from '../../mock/mock'
function List (props) {
  const [list,setList] = useState([])
  const [login,setLogin] =useState(true)
  useEffect(()=>{
    api.goods.getProductsList().then(res=>{
      setList(res)
      setLogin(false)
    })
  },[])
  const columns = [
    {
      title: "序号",
      key: 'id',
      width: 80,
      align: 'center',
      render: (txt, record, index) => index + 1
    },
    {
      title: '名字',
      dataIndex: 'goodsName'
    },
    {
      title: '价格',
      dataIndex: 'goodsPrice'
    },
    {
      title: '商品封面图',
      dataIndex: 'goodsImg',
      render:(record) => 
        <img src={record} height="100px" width="100px" style={{objectFit:'cover'}} />
    },
    {
      title:"商品描述",
      dataIndex:'goodsDescription',
      width:'300px'
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return (
          <div>
            <Button size="small" type="primary" onClick={()=>props.history.push("/admin/products/edit/2")}>修改</Button>
            <Popconfirm
              title='确定删除此项?'
              okText="确定"
              cancelText="取消"
            // onConfirm={confirm}
            >
              <Button size="small" type="danger" style={{ margin: "0 1rem" }}>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Spin spinning={login}>
        <Card
          title="商品列表"
          extra={<Button type="primary" onClick={() => props.history.push("/admin/products/edit")}>新增</Button>}>
          <Table rowKey='id' bordered columns={columns} dataSource={list}></Table>
        </Card>
      </Spin>
    </div>
  )
}

export default List