import React,{useState,useEffect} from 'react';
import {Input, Button, Popconfirm} from 'antd';
import Table from '@/components/Table';
import axios from '@/utils/api';

const renderInput = (text,record,index,field) => {
  return record.edit ? (
    <Input
      // value={
      //   editArr[index] && editArr[index][field]
      //     ? editArr[index][field]
      //     : record[field]
      // }
      value={record.category_name}
    />
  ) : (
    text.category_name
  );
}

function List (props) {
  const [data,setList] = useState([])
  const [edit,setEdit] = useState('false')
  const editInput = (record)=> {
    const id = record.category_id.toString().substring(0,1);
    const newList = data;
    newList.forEach((item,index) => {
      let categoryID = item.category_id.toString().substring(0,1);
      if(categoryID === id){
        item.edit = true;
      } else {
        item.edit = false
      }
    });
    setList(newList)
    setEdit('true')
  }
  const candle =()=>{
    setEdit("false")
  }
  useEffect(()=>{
      setEdit("false")
  },[edit])
  useEffect(()=> {
   axios.goods.getCategoryList().then(res => {
     setList(res.data)
   })
  },[])
  var columns = [
    {
      title: "分类id",
      dataIndex: 'category_id',
      width: 80,
      align: 'center',
    },
    {
      title: '名字',
      width: 180,
      render:(text,record,index) => {
       return renderInput(text, record, index, "category_name")
      }
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return !record.edit?(
          <div>
            <Button size="small" type="primary" onClick={()=>{editInput(record)}}>修改</Button>
            <Popconfirm
              title='确定删除此项?'
              okText="确定"
              cancelText="取消"
            // onConfirm={confirm}
            >
              <Button size="small" type="danger" style={{ margin: "0 1rem" }}>删除</Button>
            </Popconfirm>
          </div>
        ) :(
          <div>
          <Button size="small" type="primary" onClick={()=>{console.log(txt, record, index)}}>保存</Button>
          <Popconfirm
            title='确定删除此项?'
            okText="确定"
            cancelText="取消"
          // onConfirm={confirm}
          >
            <Button size="small" type="danger" style={{ margin: "0 1rem" }}>删除</Button>
          </Popconfirm>
        </div>
        );
      }
    }
  ]
  return (
    <div>
      <Table title="商品分类" datalist={data} rowKey='category_id'  columns={columns} ></Table>
    </div>
  )
}

export default List