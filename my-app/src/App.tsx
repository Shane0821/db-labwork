
import React, { useState, useEffect } from 'react'
import {
  Layout, Menu, Breadcrumb, Avatar, Button, Card, Divider, Input,
  message, Pagination, Select, Skeleton, Tag, Typography, Upload, Tooltip,
  Col, Row, Descriptions, Form, Radio, Space
} from 'antd'
import logo from './logo.svg';
import './App.css';

import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  StarOutlined,
  UserSwitchOutlined,
  FormOutlined,
  LockOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined
} from '@ant-design/icons';

import { Basement, Container } from './components/BasicHTMLElement'

const { Text, Title, Paragraph } = Typography;

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;



function App() {
  const [selectedMenu, setSelectedMenu] = useState("1");

  const onSelectMenu = (e: any) => {
    setSelectedMenu(e.key);
  }

  useEffect(
    () => {

    }, [selectedMenu]
  )

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            nav 4
          </Menu.Item>
          <Menu.Item key="5" icon={<CloudOutlined />}>
            nav 5
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            nav 6
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            nav 7
          </Menu.Item>
          <Menu.Item key="8" icon={<ShopOutlined />}>
            nav 8
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial'}}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', minHeight: '80vh' }}>
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>DB Lab ©2021 Created by Shane</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
