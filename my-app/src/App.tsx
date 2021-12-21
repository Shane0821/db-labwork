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

import { Basement, Container } from './components/BasicHTMLElement'
import { Router } from 'react-router';
import { waitFor } from '@testing-library/react';

const { Text, Title, Paragraph } = Typography;

const { Search } = Input;
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

/*const data = [
  {
    eno: 1,
    ename: "张三",
    gender: "男",
    age: 30,
    dno: 203,
    dname: "人事部"
  }
];*/



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
    } else if (pathname == '/board') {
      return '4';
    }
    return '5';
  });

  const [employeeData, setEmployeeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [addVisible, setAddVisible] = useState(false);

  const showAddDrawer = () => {
    setAddVisible(true);
  }

  const onSelectMenu = (e: any) => {
    setSelectedMenu(e.key);
  }

  const GetEmployees = async () => {
    const res = await staticApi.get('/employee', {})
    console.log("source:", res);
    if (res.data.success) {
      setEmployeeData(res.data.data);
    } else {
      message.error(res.data.reason)
    }
  }

  const GetDepartments = async () => {
    const res = await staticApi.get('/department', {})
    console.log("source:", res);
    if (res.data.success) {
      setDepartmentData(res.data.data);
    } else {
      message.error(res.data.message)
    }
  }

  const GetProjects = async () => {

  }

  const GetBoard = async () => {

  }

  const getURL = () => {
    if (selectedMenu == '1') return '/department/search';
    else if (selectedMenu == '2') return '/employee/search';
    else if (selectedMenu == '3') return '/project/search';
    return '/department/search';
  }

  const onSearch = async (e: string) => {
    console.log(e);
    var myurl = getURL();
    const res = await staticApi.get(myurl, {
      params: {
        searchitem: e
      }
    })
    console.log("source:", res);
    if (res.data.success) {
      if (selectedMenu == '1')
        setDepartmentData(res.data.data);
      else if (selectedMenu == '2')
        setEmployeeData(res.data.data);
    } else {
      message.error(res.data.reason)
    }
  }

  useEffect(
    () => {
      console.log(employeeData);
      if (selectedMenu == "1") {
        GetDepartments();
      } else if (selectedMenu == "2") {
        GetEmployees();
      } else if (selectedMenu == "3") {
        GetProjects();
      } else if (selectedMenu == "4") {
        GetBoard();
      }
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
          <Menu.Item key="3" icon={<CloudOutlined />}>
            项目管理
            <Link to={"/project"} />
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            员工榜
            <Link to={"/board"} />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ paddingLeft: 24, paddingTop: 24, display: 'flex' }} hidden={selectedMenu == '5' || selectedMenu == '4'}>
            <Search
              placeholder="input search text"
              allowClear={true}
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              style={{ width: '25%' }}
            />

            <Button type="primary" size="large" style={{ marginLeft: 24, display: 'flex', alignItems: 'center' }} onClick={showAddDrawer}>
              <PlusOutlined></PlusOutlined>新增
            </Button>
            <Drawer
              title={
                selectedMenu == '1' ? `添加部门` :
                  selectedMenu == '2' ? `添加员工` : '添加项目'
              }
              placement="right"
              size='default'
              visible={addVisible}
              onClose={() => { setAddVisible(false); }}
            >
              


            </Drawer>
          </div>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', minHeight: '80vh' }}>

            <Routes>
              <Route path="/" element={<img src="./images/home.jpg" width="100%"></img>}></Route>
              <Route path="/employee" element={<EmployeeTable data={employeeData}></EmployeeTable>}></Route>
              <Route path="/department" element={<DepartmentTable data={departmentData}></DepartmentTable>}></Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>DB Lab ©2021 Created by Shane</Footer>
      </Layout>
    </Layout >
  );
}

export default App;
