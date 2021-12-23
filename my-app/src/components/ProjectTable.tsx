import React, { Component, useState, useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import { title } from 'process';
import { EmployeeModel, ProjectModel } from '../utils/DataModel';
import {
    Layout, Menu, Breadcrumb, Avatar, Card, Divider, Input,
    message, Pagination, Select, Skeleton, Typography, Upload, Tooltip,
    Col, Row, Descriptions, Form, Radio, Drawer, Popconfirm, DatePicker, Modal
} from 'antd'
import { staticApi } from '../utils/http-common';
import { Basement, Container } from './BasicHTMLElement'
import { Router } from 'react-router';
import { waitFor } from '@testing-library/react';
import moment from 'moment';

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
    QuestionCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { format } from 'util';
import { EmployeeTable } from './EmployeeTable';

const { Text, Title, Paragraph } = Typography;

const { Search } = Input;
const { SubMenu } = Menu;
const { Column, ColumnGroup } = Table;

export const ProjectTable = (props: {}) => {
    const [data, setData] = useState<Array<ProjectModel>>([]);
    const [employee, setEmployee] = useState<Array<EmployeeModel>>([]);
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataForm] = Form.useForm();
    const [recordForm] = Form.useForm();
    const [opt, setOpt] = useState(0);
    const [title, setTitle] = useState("");

    const showDrawer = () => {
        setVisible(true);
    }

    useEffect(
        () => {
            getData();
        }, []
    )

    const getData = async () => {
        const res = await staticApi.get('/project', {})
        console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }


    const getEmployee = async (pno: number) => {
        const res = await staticApi.get('/employee/project', {
            params: {
                pno: pno
            }
        })
        // console.log("source:", res);
        if (res.data.success) {
            setEmployee(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    const removeRecord = async (eno: number, pno: any) => {
        const res = await staticApi.delete('/pro_emp/delete', {
            params: {
                pno: pno,
                eno: eno
            }
        })
        // console.log("source:", res);
        if (res.data.success) {
            message.success('删除成功');
            getEmployee(pno);
            getData();
        } else {
            message.error(res.data.message)
        }
    }

    const deleteElement = async (text: any, record: any, index: any) => {
        // console.log(record.dno);
        const res = await staticApi.delete('/project/delete', {
            params: {
                pno: record.pno
            }
        })
        // console.log("source:", res);
        if (res.data.success) {
            message.success('删除成功');
            getData();
        } else {
            message.error(res.data.message)
        }
    }

    const onSearch = async (e: string) => {
        console.log(e);
        const res = await staticApi.get('/project/search', {
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

    const handleSubmit = async (values: ProjectModel) => {
        console.log(values);
        const checkReg = /\s+/;
        if (values.pno !== undefined && values.pno.toString().search(checkReg) !== -1) message.error('请不要使用空白字符');
        else if (values.stime > values.ftime) message.error('项目结束时间不可小于起始时间');
        else {
            if (opt == 0) {
                const res = await staticApi.post('/project/new', {
                    params: {
                        pno: values.pno,
                        dsc: values.dsc,
                        stime: values.stime,
                        ftime: values.ftime
                    }
                });
                // console.log(res);
                if (res.data.success) {
                    message.success('提交成功')
                    dataForm.resetFields();
                    setVisible(false);
                    getData();
                } else {
                    message.warning(res.data.message)
                }
            } else {
                const res = await staticApi.post('/project/update', {
                    params: {
                        dsc: values.dsc,
                        stime: values.stime,
                        ftime: values.ftime,
                        pno: values.pno,
                        leaderno: values.leaderno
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

    const handleRecordSubmit = async (values: any, pno: any) => {
        const checkReg = /\s+/;
        if (values.eno !== undefined && values.eno.toString().search(checkReg) !== -1) message.error('请不要使用空白字符');
        else {
            const res = await staticApi.post('/pro_emp/new', {
                params: {
                    eno: values.eno,
                    pno: pno
                }
            });
            // console.log(res);
            if (res.data.success) {
                message.success('添加成功')
                recordForm.resetFields();
                getEmployee(pno);
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

                <Button type="primary" size="large"
                    style={{ marginLeft: 24, display: 'flex', alignItems: 'center' }}
                    onClick={() => { showDrawer(); setOpt(0); }}
                >
                    <PlusOutlined></PlusOutlined>新增
                </Button>
                <Drawer
                    title={opt === 1 ? `修改信息` : `添加项目`}
                    placement="right"
                    size='default'
                    visible={visible}
                    onClose={() => {
                        setVisible(false);
                        if (opt === 1) dataForm.resetFields();
                    }}
                >
                    <Form labelCol={{ span: 6 }} onFinish={handleSubmit} form={dataForm}>
                        <Form.Item wrapperCol={{ span: 10 }} name="pno" label="项目号" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input disabled={opt === 1} onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 15 }} name="dsc" label="项目简介" rules={[{ required: true, message: 'Please input Intro' }]}>
                            <Input.TextArea showCount maxLength={200} size={"large"} rows={5} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="stime" label="起始时间" rules={[{ required: true, message: 'Please input Info' }]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="ftime" label="结束时间" rules={[{ required: true, message: 'Please input Info' }]}>
                            <DatePicker />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 10 }} name="leaderno" label="项目负责人" hidden={opt === 0}>
                            <Select placeholder="选择负责人">
                                <Select.Option value={''}>空缺</Select.Option>
                                {employee.map((item) =>
                                    <Select.Option value={item.eno}>{item.eno}{"  "}{item.ename}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8 }}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
            <Table dataSource={data} pagination={false} bordered={true}>
                <Column title="项目号" dataIndex="pno" key="pno" />
                <Column title="项目简介" dataIndex="dsc" key="dsc" ellipsis={{ showTitle: false }}
                    render={dsc => (
                        <Tooltip placement="topLeft" title={dsc}>{dsc}</Tooltip>
                    )}
                />
                <Column title="起始时间" dataIndex="stime" key="stime" />
                <Column title="结束时间" dataIndex="ftime" key="ftime" />
                <ColumnGroup title="项目负责人" >
                    <Column title="编号" dataIndex="leaderno" key="leaderno" />
                    <Column title="姓名" dataIndex="ename" key="ename" />
                </ColumnGroup>
                <Column title="参与员工列表" key="employeelist"
                    render={(text, record: ProjectModel, index) => (
                        <>
                            <Button type="link"
                                onClick={() => { setModalVisible(true); getEmployee(record.pno); setTitle(record.pno.toString()); }}>
                                查看
                            </Button>
                            <Modal
                                title={"项目 " + title + " 参与员工列表"}
                                centered
                                visible={modalVisible}
                                footer={null}
                                onCancel={() => setModalVisible(false)}
                                width={1000}
                            >
                                <div className="site-layout-background" style={{ paddingBottom: 24, display: 'flex' }}>
                                    <Form onFinish={(e) => handleRecordSubmit(e, title)} form={recordForm} layout="inline">
                                        <Form.Item name="eno" label="员工编号" rules={[{ required: true, message: 'Please input Info' }]}>
                                            <Input placeholder={"输入员工编号"} onPressEnter={(e) => { e.preventDefault() }} allowClear />
                                        </Form.Item>
                                        <Form.Item >
                                            <Button type="primary" size="middle"
                                                style={{ display: 'flex', alignItems: 'center' }}
                                                htmlType="submit"
                                            >
                                                <PlusOutlined></PlusOutlined>添加
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <Table dataSource={employee} pagination={false} bordered={true}>
                                    <Column title="编号" dataIndex="eno" key="eno" />
                                    <Column title="姓名" dataIndex="ename" key="ename" />
                                    <Column title="部门号" dataIndex="dno" key="dno" />
                                    <Column title="部门名称" dataIndex="dname" key="dname" />
                                    <Column title="联系电话" dataIndex="phone" key="phone" />
                                    <Column title="操作" key="action"
                                        render={(text, erc: EmployeeModel, index) => (
                                            <Popconfirm onConfirm={() => { removeRecord(erc.eno, title) }}
                                                title="Are you sure?"
                                                icon={<QuestionCircleOutlined
                                                    style={{ color: 'red' }} />}
                                                okText={<a>确定</a>}
                                                cancelText={<a>取消</a>}
                                            >
                                                <Button>删除</Button>
                                            </Popconfirm>
                                        )}
                                    />
                                </Table>
                            </Modal>
                        </>
                    )}
                />
                <Column
                    title="操作"
                    key="action"
                    render={(text, record: ProjectModel, index) => (
                        <Space>
                            <Button type="primary"
                                onClick={() => {
                                    showDrawer();
                                    const tmp1 = record.stime;
                                    const tmp2 = record.ftime;
                                    Reflect.set(record, 'stime', moment.utc(record.stime, "YYYY-MM-DD"));
                                    Reflect.set(record, 'ftime', moment.utc(record.ftime, "YYYY-MM-DD"));
                                    setOpt(1);
                                    getEmployee(record.pno);
                                    dataForm.setFieldsValue(record);
                                    Reflect.set(record, 'stime', tmp1);
                                    Reflect.set(record, 'ftime', tmp2);
                                }}
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
