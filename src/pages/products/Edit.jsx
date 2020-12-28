import React from 'react'
import { Card, Button, Form, Input, message } from 'antd'
import Upload from '../../components/Upload';
function Edit () {
  const [form] = Form.useForm();
  const [imgList,setImgList] = React.useState([]);
  const handleSubmit1 = e => {
    e.preventDefault();
    form.validateFields().then(res => {
      console.log(res);
      console.log(imgList);
    })
      .catch(error => {
        message.error('不合法')
      })
  }
  return (
    <div>
      <Card title="编辑">
        <Form form={form} onSubmitCapture={e => handleSubmit1(e)}>
          <Form.Item label="商品名称" name="goodName"
            rules={[{ required: true, message: '请输入商品名称' },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('goodName') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请合法输入商品名称');
              }
            }),]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="商品价格" name="goodPrice"
            rules={[{ required: true, message: '请输入商品价格' },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('goodPrice') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请合法输入商品价格');
              }
            }),]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="商品描述" name="goodDescription"
            rules={[{ required: true, message: '请输入商品描述信息' },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('goodDescription') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请输入商品描述信息');
              }
            }),]}
          >
            <Input.TextArea maxLength='100' placeholder="请输入商品描述信息" />
          </Form.Item>
          <Form.Item label="商品封面图" name="goodimg" >
            <Upload imgList={imgList} setImgList={setImgList}></Upload>
          </Form.Item>
          <Button htmlType="submit" type="primary">保存</Button>
        </Form>
      </Card>
    </div >
  )
}

export default Edit
