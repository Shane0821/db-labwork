import React, { Component, useState, useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import { title } from 'process';
import { EmployeeModel } from '../utils/DataModel';
import {
    Layout, Menu, Breadcrumb, Avatar, Card, Divider, Input,
    message, Pagination, Select, Skeleton, Typography, Upload, Tooltip,
    Col, Row, Descriptions, Form, Radio, Drawer
} from 'antd'
import { staticApi } from '../utils/http-common';
import { Basement, Container } from './BasicHTMLElement'
import { Router } from 'react-router';
import { waitFor } from '@testing-library/react';

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

const { Text, Title, Paragraph } = Typography;

const { Search } = Input;
const { SubMenu } = Menu;
const { Column, ColumnGroup } = Table;

export const DepartmentTable = (props: {}) => {
    const [data, setData] = useState([]);
    const [addVisible, setAddVisible] = useState(false);
    const [dataForm] = Form.useForm();


    useEffect(
        () => {
            getData();
        }, []
    )

    const showAddDrawer = () => {
        setAddVisible(true);
    }

    const getData = async () => {
        const res = await staticApi.get('/department', {})
        console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    const deleteElement = async (index: any, record: any) => {
        return;
        console.log(record.eno);
        const res = await staticApi.delete('/department/delete', {
            params: {
                eno: record.eno
            }
        })
        console.log("source:", res);
        if (res.data.success) {
            data.splice(index, 1);
        } else {
            message.error(res.data.message)
        }
    }

    const onSearch = async (e: string) => {
        return;
        console.log(e);
        const res = await staticApi.get('/department/search', {
            params: {
                searchitem: e
            }
        })
        console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    const handleSubmit = async (values: any) => {
        return;
        console.log(values);
        const checkReg = /\s+/;
        if (values.username && values.username.search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.nickname && values.nickname.search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.email && values.email.search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.phone_number && values.phone_number.search(checkReg) !== -1) message.error('请不要使用空白字符');
        else {
            const res = await staticApi.post('/department/new', {
                params: {
                    eno: values.eno,
                    ename: values.ename,
                    gender: values.gender,
                    age: values.age,
                    dno: values.dno
                }
            });
            console.log(res);
            if (res.data.success) {
                message.success('提交成功')
                setAddVisible(false);
            } else {
                message.warning(res.data.message)
            }
        }
    }


    return (
        <>
            <div className="site-layout-background" style={{ paddingBottom: 24, display: 'flex' }}>
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
                    title={`添加员工`}
                    placement="right"
                    size='default'
                    visible={addVisible}
                    onClose={() => { setAddVisible(false); }}
                >
                    <Form labelCol={{ span: 8 }} onFinish={handleSubmit} form={dataForm}>
                        <Form.Item wrapperCol={{ span: 10 }} name="eno" label="员工编号" >
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="ename" label="员工姓名" >
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 20 }} name="gender" label="性别" >
                            <Radio.Group>
                                <Radio.Button value={"男"} style={{ width: '64px', textAlign: 'center' }}>男</Radio.Button>
                                <Radio.Button value={"女"} style={{ width: '64px', textAlign: 'center' }}>女</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="age" label="年龄">
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="dno" label="部门号" >
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10 }}>
                            <Button type="default" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
            <Table dataSource={data} pagination={false} bordered={true}>
                <Column title="编号" dataIndex="dno" key="dno" />
                <Column title="名称" dataIndex="dname" key="dname" />
                <Column title="办公地点" dataIndex="address" key="address" />
                <ColumnGroup title="部门经理">
                    <Column title="编号" dataIndex="boosno" key="bossno" />
                    <Column title="姓名" dataIndex="ename" key="ename" />
                </ColumnGroup>
                <Column
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <Space>
                            <Button type="primary">修改</Button>
                            <Button type="dashed">删除</Button>
                        </Space>
                    )}
                />
            </Table>
        </>)
}
