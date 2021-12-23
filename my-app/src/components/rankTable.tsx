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

export const RankTable = (props: {}) => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [project, setProject] = useState<Array<ProjectModel>>([]);

    useEffect(
        () => {
            getData();
        }, []
    )

    const getData = async () => {
        const res = await staticApi.get('/pro_emp/rank', {})
        //console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    const getProject = async (eno: number) => {
        const res = await staticApi.get('/project/employee', {
            params: {
                eno: eno
            }
        })
        //console.log("source:", res);
        if (res.data.success) {
            setProject(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    return (
        <>
            <Table dataSource={data} pagination={false} bordered={true}>
                <Column title="排名" dataIndex="rank" key="rank" />
                <Column title="员工编号" dataIndex="eno" key="eno" />
                <Column title="员工姓名" dataIndex="ename" key="ename" />
                <Column title="参与项目数" dataIndex="cnt" key="cnt" />
                <Column title="详情" key="employeelist"
                    render={(text, record: EmployeeModel, index) => (
                        <>
                            <Button type="link"
                                onClick={() => {
                                    setVisible(true);
                                    getProject(record.eno);
                                }}>
                                查看
                            </Button>
                        </>)}
                />
            </Table>
            <Drawer
                title={`Ta参与的项目`}
                placement="right"
                size='large'
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
            >
                <Table dataSource={project} pagination={false} bordered={true}>
                    <Column title="项目号" dataIndex="pno" key="pno" />
                    <Column title="项目简介" dataIndex="dsc" key="dsc" ellipsis={{ showTitle: false }}
                        render={dsc => (
                            <Tooltip placement="topLeft" title={dsc}>{dsc}</Tooltip>
                        )}
                    />
                    <Column title="起始时间" dataIndex="stime" key="stime" />
                    <Column title="结束时间" dataIndex="ftime" key="ftime" />
                </Table>
            </Drawer>
        </>)
}
