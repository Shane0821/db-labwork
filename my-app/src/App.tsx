import React, { Component, useState, useEffect } from 'react'
import {
  Layout, Menu, Breadcrumb, Avatar, Button, Card, Divider, Input,
  message, Pagination, Select, Skeleton, Tag, Typography, Upload, Tooltip,
  Col, Row, Descriptions, Form, Radio, Space, Drawer
} from 'antd'
import { DrawerProps } from 'antd/es/drawer';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { EmployeeTable } from './components/EmployeeTable';
import { DepartmentTable } from './components/DepartmentTalbe';
import { ProjectTable } from './components/ProjectTable';
import { RankTable } from './components/RankTable';

import { EmployeeModel } from './utils/DataModel';
import { staticApi } from './utils/http-common';

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
  ShopOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

function App() {
  const [selectedMenu, setSelectedMenu] = useState(() => {
    const urlParams = new URL(window.location.href);
    const pathname = urlParams?.pathname;
    if (pathname == '/employee') {
      return '2';
    } else if (pathname == '/') {
      return '5';
    } else if (pathname == '/department') {
      return '1';
    } else if (pathname == '/project') {
      return '3';
    } else if (pathname == '/rank') {
      return '4';
    }
    return '5';
  });

  const onSelectMenu = (e: any) => {
    setSelectedMenu(e.key);
  }

  useEffect(
    () => {

    }, []
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedMenu]} onSelect={onSelectMenu}>
          <Menu.Item key="5" icon={<HomeOutlined />}>
            首页
            <Link to={"/"} />
          </Menu.Item>
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            部门管理
            <Link to={"/department"} />
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            员工管理
            <Link to={"/employee"} />
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="项目管理">
            <Menu.Item key="3" icon={<CloudOutlined />}>
              项目列表
              <Link to={"/project"} />
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              统计
              <Link to={"/rank"} />
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<img src="./images/home.jpg" width="100%"></img>}></Route>
              <Route path="/employee" element={<EmployeeTable></EmployeeTable>}></Route>
              <Route path="/department" element={<DepartmentTable></DepartmentTable>}></Route>
              <Route path="/project" element={<ProjectTable></ProjectTable>}></Route>
              <Route path="/rank" element={<RankTable></RankTable>}></Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>DB Lab ©2021 Created by Shane</Footer>
      </Layout>
    </Layout >
  );
}

export default App;
