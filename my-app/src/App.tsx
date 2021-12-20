import React, { Component, useState, useEffect } from 'react'
import {
  Layout, Menu, Breadcrumb, Avatar, Button, Card, Divider, Input,
  message, Pagination, Select, Skeleton, Tag, Typography, Upload, Tooltip,
  Col, Row, Descriptions, Form, Radio, Space
} from 'antd'
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeModel } from './utils/DataModel';

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

const data = [
  {
    eno: 1,
    ename: "张三",
    gender: "男",
    age: 30,
    dno: 203,
    dname: "人事部"
  }
];


function App() {
  const [selectedMenu, setSelectedMenu] = useState("5");
  const [employeeData, setEmployeeData] = useState([]);


  const onSelectMenu = (e: any) => {
    setSelectedMenu(e.key);
  }

  const GetEmployees = () => {
    console.log(23);
  }

  const GetDepartments = () => {

  }

  const GetProjects = () => {

  }

  const GetBoard = () => {

  }

  useEffect(
    () => {
      if (selectedMenu === "1") {
        GetDepartments();
      } else if (selectedMenu === "2") {
        GetEmployees();
      } else if (selectedMenu === "3") {
        GetProjects();
      } else if (selectedMenu === "4") {
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}>
          <Menu.Item key="5" icon={<AppstoreOutlined />}>
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
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<img src="./images/home.jpg" width="100%"></img>}></Route>
              <Route path="/employee" element={<EmployeeTable data={data}></EmployeeTable>}>
              </Route>
            </Routes>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>DB Lab ©2021 Created by Shane</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
