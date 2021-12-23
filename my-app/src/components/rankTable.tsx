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

    useEffect(
        () => {
            getData();
        }, []
    )

    const getData = async () => {
        return;
        const res = await staticApi.get('/project', {})
        console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    return (
        <>
            <Table dataSource={data} pagination={false} bordered={true}>
                <Column title="项目号" dataIndex="pno" key="pno" />
                <Column title="起始时间" dataIndex="stime" key="stime" />
                <Column title="结束时间" dataIndex="ftime" key="ftime" />
            </Table>
        </>)
}
