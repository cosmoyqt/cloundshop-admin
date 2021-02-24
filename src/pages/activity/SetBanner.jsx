import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, Card, Form, Input, message } from 'antd'
import Table from '@/components/Table';
import axios from '@/utils/api';
import '@/assets/css/SetBanner.scss'
function SetBanner (props) {
  const [form] = Form.useForm();
  const [list, setList] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [edit, setEdit] = useState(false);
  const saveBanner = (id) => {
    form.validateFields().then(res => {
      if (id === '999999') {
        axios.activity.addBanner(res).then(res => {
          message.success("新增成功")
          setDisabled(false)
          setEdit(false)
          getbannerList();
        })
          .catch(err => {
            message.error("新增失败")
          })
      } else {
        res.banner_id = id;
        axios.activity.updateBannerById(res).then(res => {
          message.success("修改成功")
          setEdit(false)
          getbannerList();
        })
          .catch(err => {
            message.error("修改失败")
          })
      }
    })
  }
  const cancleHandle = (record) => {
    if (record.banner_id === '999999') {
      let data = list.slice(1);
      setList(data);
    }
    setDisabled(false)
    record.edit = false;
    setEdit(false)
  }
  const deleteBanner = (record) => {
    axios.activity.deleteBanner(record.banner_id).then(res => {
      message.success("删除成功")
      getbannerList();
    })
      .catch(err => {
        message.error("删除失败")
      })
    record.edit = false;
    setEdit(false)
  }
  const editHandle = (record) => {
    if (edit === true) {
      return
    }
    record.edit = true;
    setEdit(true);
    setDisabled(true);
  }
  const columns = [
    {
      title: "序号",
      dataIndex: 'banner_id',
      align: 'center',
    },
    {
      title: '名字',
      align: 'center',
      render: (text, record, index) => {
        return renderInput(text, record, index)
      }
    },
    {
      title: '图片',
      render: (record) => {
        return record.edit ? (
          <Form preserve={false} form={form}>
            <Form.Item initialValue={record.banner_img} name='banner_img'
              rules={[{ required: true, message: '请输入对应的参数' },
              ({ getFieldValue }) => ({
                validator (rule, value) {
                  if (!value || getFieldValue('banner_img') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('请合法输入对应的参数');
                }
              }),]}
            >
              <Input
              />
            </Form.Item>
          </Form>
        ) : (
            <img onClick={() => { window.open(record.banner_img) }} src={record.banner_img} height="100px" width="200px" style={{ objectFit: 'cover' }} />
          );
      }
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return record.edit ? (
          <div>
            <Button size="small" onClick={() => { saveBanner(record.banner_id); }} type="primary">保存</Button>
            <Button size="small" onClick={() => { cancleHandle(record); }} type="danger" style={{ margin: "0 1rem" }}>取消</Button>
          </div>
        ) : (
            <div>
              <Button size="small" onClick={() => { editHandle(record) }} type="primary">修改</Button>
              <Popconfirm
                title='确定删除此项?'
                okText="确定"
                cancelText="取消"
                onConfirm={(e) => deleteBanner(record)}
              >
                <Button size="small" type="danger" style={{ margin: "0 1rem" }}>删除</Button>
              </Popconfirm>
            </div>
          )
      }
    }
  ];
  const renderInput = (text, record, index) => {
    return record.edit ? (
      <Form form={form} preserve={false}>
        <Form.Item initialValue={record.banner_name} name='banner_name'
          rules={[{ required: true, message: '请输入对应的参数' },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('banner_name') === value) {
                return Promise.resolve();
              }
              return Promise.reject('请合法输入对应的参数');
            }
          }),]}
        >
          <Input
          />
        </Form.Item>
      </Form>
    ) : (
        text.banner_name
      );
  }
  const addTable = () => {
    let tableList = ({
      edit: true,
      banner_id: "999999",
      banner_name: '',
      banner_img: ''
    });
    setList([tableList, ...list,])
    setEdit(true)
    setDisabled(true)
  }
  const getbannerList = () => {
    axios.activity.getDannerList().then(res => {
      setList(res.data)
    })
  }
  useEffect(() => {
    getbannerList();
  }, [])
  return (
    <div>
      <Card title="商品列表" extra={<Button disabled={disabled ? true : false} type="primary" onClick={() => { addTable() }} >新增</Button>}>
        <Table datalist={list} rowKey="banner_id" columns={columns}></Table>
      </Card>
    </div>
  )
}

export default SetBanner