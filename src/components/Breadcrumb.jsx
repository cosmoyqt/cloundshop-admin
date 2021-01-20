import React from 'react';
import {Breadcrumb} from 'antd';
import { withRouter } from 'react-router-dom'
import { adminRoutes } from '@/routes';
import {getBreadcrumbs} from '../hoc/BreadcrumbsHoc';
function index (props) {
  const list = getBreadcrumbs({
    routerList: adminRoutes,
    location:props.location,
  });
  const handleClick = (e) => {
      props.history.push(e.key+'123')
  }
  return list.length>=2?(
  <Breadcrumb onClick={(e)=>handleClick(e)} style={{ margin: '16px 0' }}>
  {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
  <Breadcrumb.Item>List</Breadcrumb.Item>
  <Breadcrumb.Item>App</Breadcrumb.Item> */}
  {
    list.map((item,inddex)=> {
      return (<Breadcrumb.Item key={item.path}>{item.content}</Breadcrumb.Item>)
    })
  }
</Breadcrumb>
  ):(
    <div></div>
  );
}
export default withRouter(index)