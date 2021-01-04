import React from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, message } from 'antd';
import { withRouter } from 'react-router-dom'
import '../../assets/css/Frame.css'
import logo from '../../assets/images/logo.png';
import { adminRoutes } from '../../routes'
import * as Icon from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
function Index (props) {
  const handleClick = (e) => {
    if(e.key === 'logOut'){
      props.history.push('/login')
    } else {
      message.info(e.key)
    }
  }
function renderMenu (data){
  data = data.filter(route => route.isShow)
    return data.map(item => {
      //如果item有子元素,遍历自己,再次调用,直到子节点加载完毕
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.path}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path} onClick={(e)=> props.history.push(e.key)}>
          {React.createElement(Icon[item.icon], {
          })}
          {item.title}
        </Menu.Item>
      )
    });
}
  const popMenu = (
    <Menu onClick={(e)=>handleClick(e)}>
      <Menu.Item key="noti">通知中心</Menu.Item>
      <Menu.Item key="setting">设置</Menu.Item>
      <Menu.Item key="logOut">推出</Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <Header className="header" style={{
        backgroundColor: "#0094ff"
      }}>
        <div className="logo" >
          <img src={logo} alt="" />
        </div>
        <Dropdown className="right" overlay={popMenu}>
          <div>yqtt
            {React.createElement(Icon['DownOutlined'], {
          })} </div>

        </Dropdown>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="vertical"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['/admin/dashboroad']}
              style={{ height: '100%' }}
            >
              {
                renderMenu(adminRoutes)
              }
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
export default withRouter(Index);