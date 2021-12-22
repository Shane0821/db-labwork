import React, { Component, useState, useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import { title } from 'process';
import { EmployeeModel } from '../utils/DataModel';
import {
    Layout, Menu, Breadcrumb, Avatar, Card, Divider, Input,
    message, Pagination, Select, Skeleton, Typography, Upload, Tooltip,
    Col, Row, Descriptions, Form, Radio, Drawer, Popconfirm
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
    PlusOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

const { Search } = Input;
const { SubMenu } = Menu;
const { Column, ColumnGroup } = Table;

export const EmployeeTable = (props: {}) => {
    const [data, setData] = useState<Array<EmployeeModel>>([]);
    const [visible, setVisible] = useState(false);
    const [dataForm] = Form.useForm();
    const [opt, setOpt] = useState(0);


    const showDrawer = () => {
        setVisible(true);
    }

    const getData = async () => {
        const res = await staticApi.get('/employee', {})
        console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    const deleteElement = async (text: any, record: any, index: any) => {
        console.log(record.eno);
        const res = await staticApi.delete('/employee/delete', {
            params: {
                eno: record.eno
            }
        })
        console.log("source:", res);
        if (res.data.success) {
            message.success('删除成功');
            getData();
        } else {
            message.error(res.data.message)
        }
    }

    const onSearch = async (e: string) => {
        console.log(e);
        const res = await staticApi.get('/employee/search', {
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

    const handleSubmit = async (values: EmployeeModel) => {
        console.log(values);
        const checkReg = /\s+/;
        if (values.ename !== undefined && values.ename.search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.eno !== undefined && values.eno.toString().search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.dno !== undefined && values.dno.toString().search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.age !== undefined && values.age.toString().search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.phone !== undefined && values.phone.search(checkReg) !== -1) message.error('请不要使用空白字符');
        else {
            if (opt == 0) {
                const res = await staticApi.post('/employee/new', {
                    params: {
                        eno: values.eno,
                        ename: values.ename,
                        gender: values.gender,
                        age: values.age,
                        phone: values.phone,
                        dno: values.dno
                    }
                });
                console.log(res);
                if (res.data.success) {
                    message.success('提交成功')
                    dataForm.resetFields();
                    setVisible(false);
                    getData();
                } else {
                    message.warning(res.data.message)
                }
            } else {
                const res = await staticApi.post('/employee/update', {
                    params: {
                        eno: values.eno,
                        ename: values.ename,
                        gender: values.gender,
                        age: values.age,
                        phone: values.phone,
                        dno: values.dno
                    }
                });
                console.log(res);
                if (res.data.success) {
                    message.success('更新成功')
                    dataForm.resetFields();
                    setVisible(false);
                    getData();
                } else {
                    message.warning(res.data.message)
                }
            }
        }
    }


    useEffect(
        () => {
            getData();
        }, []
    )

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

                <Button type="primary" size="large"
                    style={{ marginLeft: 24, display: 'flex', alignItems: 'center' }}
                    onClick={() => { showDrawer(); setOpt(0); }}
                >
                    <PlusOutlined></PlusOutlined>新增
                </Button>
                <Drawer
                    title={opt === 1 ? `修改信息` : `添加员工`}
                    placement="right"
                    size='default'
                    visible={visible}
                    onClose={() => {
                        setVisible(false);
                        if (opt === 1) dataForm.resetFields();
                    }}
                >
                    <Form labelCol={{ span: 8 }} onFinish={handleSubmit} form={dataForm}>
                        <Form.Item wrapperCol={{ span: 10 }} name="eno" label="员工编号" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input disabled={opt === 1} onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="ename" label="员工姓名" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 20 }} name="gender" label="性别" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Radio.Group>
                                <Radio.Button value={"男"} style={{ width: '64px', textAlign: 'center' }}>男</Radio.Button>
                                <Radio.Button value={"女"} style={{ width: '64px', textAlign: 'center' }}>女</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="age" label="年龄" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="phone" label="联系电话" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="dno" label="部门号" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10 }}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
            <Table dataSource={data} pagination={false} bordered={true}>
                <Column title="编号" dataIndex="eno" key="eno" />
                <Column title="姓名" dataIndex="ename" key="ename" />
                <Column title="性别" dataIndex="gender" key="gender" />
                <Column title="年龄" dataIndex="age" key="age" />
                <Column title="部门号" dataIndex="dno" key="dno" />
                <Column title="部门名称" dataIndex="dname" key="dname" />
                <Column title="联系电话" dataIndex="phone" key="phone" />
                <Column
                    title="操作"
                    key="action"
                    render={(text, record, index) => (
                        <Space>
                            <Button type="primary"
                                onClick={() => { showDrawer(); dataForm.setFieldsValue(record); setOpt(1) }}
                            >
                                修改
                            </Button>
                            <Popconfirm onConfirm={() => { deleteElement(text, record, index) }}
                                title="Are you sure?"
                                icon={<QuestionCircleOutlined
                                    style={{ color: 'red' }} />}
                                okText={<a>确定</a>}
                                cancelText={<a>取消</a>}
                            >
                                <Button type="dashed">删除</Button>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </>)
}
