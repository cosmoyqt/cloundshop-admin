import React, { useState, useEffect } from 'react';
import { Input, Button, Popconfirm, Form, message, Card, Modal, Select } from 'antd';
import Table from '@/components/Table';
import axios from '@/utils/api';
import { getSecondaryCateList, getCategoryList } from './store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import '@/assets/css/SecondaryCategory.scss'

function SecondaryCategory (props) {
  const { Option } = Select;
  const stateList = useSelector(state => state.category.SecondaryCategoryList)
  const categoryList = useSelector(state => state.category.categoryList)
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [form] = Form.useForm();
  const [list, setList] = useState('');
  const [edit, setEdit] = useState('false');
  const columns = [
    {
      title: "二级分类id",
      dataIndex: 'series_id',
      width: 120,
      align: 'center',
    },
    {
      title: '名字',
      width: 180,
      render: (text, record, index) => {
        return renderInput(text, record, index)
      }
    },
    {
      title: "关联分类",
      width: 200,
      render: (text, record, index) => {
        return renderSelect(text, record, index)
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
              onConfirm={(e) => deleteSecondary(record)}
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
                onConfirm={(e) => deleteSecondary(record)}
              >
                <Button size="small" type="danger" style={{ margin: "0 1rem" }}>删除</Button>
              </Popconfirm>
            </div>
          );
      }
    }
  ];
  const editInput = (record) => {
    const id = record.series_id;
    const newList = stateList;
    newList.forEach((item, index) => {
      let categoryID = item.series_id;
      if (categoryID === id) {
        item.edit = true;
      } else {
        item.edit = false
      }
    });
    setList(newList)
    setEdit('true')
  }
  const renderSelect = (text, record, index) => {
    return record.edit ? (
      <Form initialValues={{ category_id: record.category_id }}  form={form}>
      <Form.Item
      name="category_id"
      defaultValue={record.category_id}
      rules={[
        {
          required: true,
        }]}>
      <Select style={{ width: 180 }}>
        {
          categoryList.map(item => {
            return (<Option key={item.category_id + '_' + item.category_name} value={item.category_id}>{item.category_name}</Option>)
          })
        }
      </Select>
    </Form.Item>
    </Form>

    ) : (
        text.category_name
      );
  }
  const renderInput = (text, record, index) => {
    return record.edit ? (
      <Form initialValues={{ series_name: record.series_name }} form={form}>
        <Form.Item name="series_name"
          rules={[{ required: true, message: '请输入分类名称' },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('series_name') === value) {
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
        text.series_name
      );
  }
  const deleteSecondary = (record) => {
    axios.category.deleteSecondary(record.series_id).then(res => {
      getSecondaryCategory()
    })
  }
  const addSecondary = () => {
    form.validateFields().then(res => {
      console.log(res);
      axios.category.addSecondary(res).then(res => {
        setIsShow(false)
        message.success("新增成功")
        getSecondaryCategory();
      })
        .catch(err => {
          message.error("新增失败")
        })
    })
  }
  const save = (record) => {
    form.validateFields().then(res => {
      const obj = {
        series_name: res.series_name,
        series_id: record.series_id,
        category_id:res.category_id
      }
      axios.category.updateSecondary(obj).then(res => {
        if (res.code === 0) {
          message.success("修改成功")
          getSecondaryCategory()
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
  const getSecondaryCategory = () => {
    dispatch(getSecondaryCateList())
  }
  const getCategory = () => {
    dispatch(getCategoryList())
  }
  useEffect(() => {
    if (categoryList.length === 0) {
      getCategory()
    }
    getSecondaryCategory();
  }, [])


  return (
    <div className="secondary">
      <Card title="二级分类" extra={<Button type="primary" onClick={() => { setIsShow(true) }}>新增</Button>}>
        <Table datalist={stateList} rowKey='series_id' columns={columns} ></Table>
      </Card>
      <Modal title="新增分类" visible={isShow} onOk={addSecondary} onCancel={() => { setIsShow(false) }}>
        <Form form={form}>
          <Form.Item label="二级分类名称" name="series_name"
            rules={[{ required: true, message: '请输入分类名称' },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('series_name') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请合法输入分类名称');
              }
            }),]}
          >
            <Input placeholder="请输入分类名称"
            />
          </Form.Item>
          <Form.Item
            style={{marginTop:20}}
            name="category_id"
            label="关联一级分类"
            rules={[
              {
                required: true,
              }]}>
            <Select style={{ width: 180 }}>
              {
                categoryList.map(item => {
                  return (<Option key={item.category_id + '_' + item.category_name} value={item.category_id}>{item.category_name}</Option>)
                })
              }
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}

export default SecondaryCategory
