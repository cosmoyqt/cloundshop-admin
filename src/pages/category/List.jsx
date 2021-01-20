import React, { useState, useEffect } from 'react';
import { Input, Button, Popconfirm, Form, message,Card,Modal } from 'antd';
import Table from '@/components/Table';
import axios from '@/utils/api';
import {useSelector,useDispatch} from 'react-redux'
import {getCategoryList} from './store/actionCreators'
function List (props) {
  const [form] = Form.useForm();
  const stateList = useSelector(state =>state.category.categoryList)
  const [data, setList] = useState([]);
  const [edit, setEdit] = useState('false');
  const [isShow,setIsShow] = useState(false);
  const dispatch = useDispatch();
  const editInput = (record) => {
    const id = record.category_id;
    const newList = stateList;
    newList.forEach((item, index) => {
      let categoryID = item.category_id;
      if (categoryID === id) {
        item.edit = true;
      } else {
        item.edit = false
      }
    });
    setList(newList)
    setEdit('true')
  }
  const renderInput = (text, record, index, field) => {
    return record.edit ? (
      <Form initialValues={{ category_name: record.category_name }} form={form}>
        <Form.Item name="category_name"
          rules={[{ required: true, message: '请输入分类名称' },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('category_name') === value) {
                return Promise.resolve();
              }
              return Promise.reject('请合法输入分类名称');
            }
          }),]}
        >
          <Input
          />
        </Form.Item>
      </Form>
    ) : (
        text.category_name
      );
  }
  const deleteCategory =(record)=> {
    axios.category.deleteCategory(record.category_id).then(res => {
      getCategory()
    })
  }
  const addCategory = ()=>{
    form.validateFields().then(res => {
      axios.category.addCategory(res).then(res => {
        setIsShow(false)
        message.success("新增成功")
        getCategory();
      })
      .catch(err => {
        message.error("新增失败")
      })
    })
    }
  const save = (record) => {
    form.validateFields().then(res => {
      const obj = {
        category_name: res.category_name,
        category_id: record.category_id
      }
      axios.category.updataCategoryList(obj).then(res => {
        if (res.code === 0) {
          message.success("修改成功")
          getCategory()
        }
      })
        .catch(err => {
          message.error("修改失败")
        })
    })
      .catch(err => {
        message.error("不合法")
      })
  }
  useEffect(() => {
    setEdit("false")
  }, [edit])
  const getCategory =()=> {
    dispatch(getCategoryList())
    // setList()
  }
  useEffect(() => {
    getCategory();
  }, [])
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
      render: (text, record, index) => {
        return renderInput(text, record, index, "category_name")
      }
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return !record.edit ? (
          <div>
            <Button size="small" type="primary" onClick={() => { editInput(record) }}>修改</Button>
            <Popconfirm
              title='确定删除此项?'
              okText="确定"
              cancelText="取消"
              onConfirm={(e)=>deleteCategory(record)}
            >
              <Button size="small" type="danger" style={{ margin: "0 1rem" }}>删除</Button>
            </Popconfirm>
          </div>
        ) : (
            <div>
              <Button size="small" type="primary" onClick={() => { save(record) }}>保存</Button>
              <Popconfirm
                title='确定删除此项?'
                okText="确定"
                cancelText="取消"
              onConfirm={(e)=>deleteCategory(record)}
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
      <Card title="一级分类" extra={<Button type="primary" onClick={()=> {setIsShow(true)}}>新增</Button>}>
      <Table  datalist={stateList} rowKey='category_id' columns={columns} ></Table>
      </Card>
      <Modal title="新增分类" visible={isShow} onOk={addCategory} onCancel={()=> {setIsShow(false)}}>
      <Form form={form}>
        <Form.Item label="分类名称" name="category_name"
          rules={[{ required: true, message: '请输入分类名称' },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('category_name') === value) {
                return Promise.resolve();
              }
              return Promise.reject('请合法输入分类名称');
            }
          }),]}
        >
          <Input placeholder="请输入分类名称"
          />
        </Form.Item>
      </Form>
      </Modal>
    </div>
  )
}

export default List