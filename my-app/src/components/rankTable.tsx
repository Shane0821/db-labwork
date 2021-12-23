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
    const [data, setData] = useState<Array<ProjectModel>>([]);

    useEffect(
        () => {
            getData();
        }, []
    )

    const getData = async () => {
        const res = await staticApi.get('/pro_emp/rank', {})
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
                <Column title="排名" dataIndex="rank" key="rank" />
                <Column title="员工编号" dataIndex="eno" key="eno" />
                <Column title="员工姓名" dataIndex="ename" key="ename" />
                <Column title="参与项目数" dataIndex="cnt" key="cnt" />
            </Table>
        </>)
}
