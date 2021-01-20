import React,{useEffect}from 'react';
import { Card, Button, Form, Input, message,Select} from 'antd'
import Upload from '@/components/Upload';
import Wangeditor from '@/components/Wangeditor';
import { useSelector, useDispatch } from 'react-redux'
import { getSecondaryCateList } from '../category/store/actionCreators';
import { setWangEditValue } from '@/pages/products/store/actionCreators'

import axios from '@/utils/api';

function Edit (props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const SecondaryCategoryList = useSelector(state => state.category.SecondaryCategoryList)
  const wangeditValue = useSelector(state =>state.products.wangEditValue);
  const [imgList,setImgList] = React.useState([]);
  const handleSubmit1 = e => {
    e.preventDefault();
    form.validateFields().then(res => {
      if(imgList.length> 0 && !!wangeditValue){ 
        res.pproduct_imgs = imgList.toString();
        res.product_details = wangeditValue;
        // 判断有没有动态id  如果没有的话 代表是新增的数据 否则是 修改
        if(props.match.params.id != undefined){
          res.product_id = props.match.params.id;
          axios.products.updateProduct(res).then(res=> {
            props.history.push("/admin/products")
          })
        } else {
          axios.products.addProducts(res).then(res => {
            props.history.push("/admin/products")
          })
        }
      } else {
        message.error('不合法')
      }
    })
      .catch(error => {
        message.error('不合法')
      })
  }
  const getSecondaryCate = () => {
    dispatch(getSecondaryCateList())
  }
  const getproduct = (id)=> {
  axios.products.getProduct(id).then(res => {
    setImgList(res.data.pproduct_imgs.split(','));
    dispatch(setWangEditValue(res.data.product_details))
    form.setFieldsValue(res.data)
  })
  }
  useEffect(() => {
    if (SecondaryCategoryList.length === 0) {
      getSecondaryCate()
    }
    if(props.match.params.id != undefined){
      getproduct(props.match.params.id);
    }
  }, [])
  return (
    <div>
      <Card title="编辑">
        <Form  form={form} onSubmitCapture={e => handleSubmit1(e)}>
          <Form.Item label="商品名称" name="product_name"
            rules={[{ required: true, message: '请输入商品名称' },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('product_name') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请合法输入商品名称');
              }
            }),]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="商品价格" name="product_price"
            rules={[{ required: true, message: '请输入商品价格' },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('product_price') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请合法输入商品价格');
              }
            }),]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            name="series_id"
            label="关联二级分类"
            rules={[
              {
                required: true,
              }]}>
            <Select style={{ width: 180 }}>
              {
                SecondaryCategoryList.map(item => {
                  return (<Option key={item.series_id + '_' + item.series_name} value={item.series_id}>{item.series_name}</Option>)
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="商品描述" name="product_description"
            rules={[{ required: true, message: '请输入商品描述信息' },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('product_description') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请输入商品描述信息');
              }
            }),]}
          >
            <Input.TextArea maxLength='100' placeholder="请输入商品描述信息" />
          </Form.Item>
          <Form.Item label="商品封面图">
            <Upload imgList={imgList} setImgList={setImgList}></Upload>
          </Form.Item>
          <Form.Item  >
            <Wangeditor />
          </Form.Item>
          <Button htmlType="submit" type="primary">保存</Button>
        </Form>
      </Card>
    </div >
  )
}

export default Edit
