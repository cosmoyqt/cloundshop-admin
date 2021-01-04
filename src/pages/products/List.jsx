import React, { useEffect,useState} from 'react'
import { Button, Popconfirm } from 'antd'
import Table from '@/components/Table';
import api from '@/utils/api';
function List (props) {
  const list = [
    {
      goodsName:'LG 4K显示器 34英寸曲面显示屏34WN80C',
      goodsPrice:'4599',
      goodsImg:'https://img13.360buyimg.com/imgzone/jfs/t1/124506/20/14838/331624/5f86b84fEab0206e8/73a347fd816b2dc4.jpg',
      goodsDescription:'LG 4K显示器 34英寸曲面显示屏HDR Type-C可60W反向充电 21:9带鱼屏 IPS面板 微边框 液晶台式电竞电脑显示屏幕34WN80C新品'
    },
    {
      goodsName:'耐克Nike Air max 97 上海限定',
      goodsPrice:'3199',
      goodsImg:'https:////img10.360buyimg.com/imgzone/jfs/t1/138252/34/15002/188204/5fb76ba8Edf3d322a/9522a8b38bb493e9.jpg',
      goodsDescription:'耐克Nike Air max 97纯白黑银子弹 白银子弹回到未来 金属银灯芯绒白粉蓝紫笑脸气垫跑鞋 CI1508-400万花筒上海限定 40'
    }
  ]
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
      dataIndex: 'goodsName',
      width: 180,
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
      title:"二级分类",
      dataIndex:'secondCategory',
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return (
          <div>
            <Button size="small" type="primary" onClick={()=>props.history.push("/admin/products/edit/"+record.id)}>修改</Button>
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
        <Table datalist={list} columns={columns} onClick={() => props.history.push("/admin/products/edit")} title="商品列表"></Table>
    </div>
  )
}

export default List