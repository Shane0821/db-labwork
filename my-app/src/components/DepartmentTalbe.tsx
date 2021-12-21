import { Table, Tag, Space, Button } from 'antd';
import { title } from 'process';
import { EmployeeModel } from '../utils/DataModel';

const { Column, ColumnGroup } = Table;

export const DepartmentTable = (props: { data: any }) => {
    return (
        <Table dataSource={props.data} pagination={false} bordered={true}>
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
        </Table>)
}
