import React from 'react'
import {Card,Table,Modal,Button,message} from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'

export default class BasicTable extends React.Component{

    state={}

    params = {
        page:1,
        pageSize:10
    }

    componentDidMount(){
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item,index)=>{
            item.key = index
        })
        this.setState({
            dataSource:data
        })
        this.request()
        this.request3()
    }

    request = ()=>{
        axios.ajax({
            url:'/table/list',
            method:'get',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if (res.code=='0'){
                res.result.map((item,index)=>{
                    item.key = index
                })
                this.setState({
                    daymicDatasource:res.result,
                    selectedRowKeys:[],
                    selectedRows:null

                })
            }
        })
    }

    request3 = ()=>{
        let _this = this
        axios.ajax({
            url:'/table/list3',
            method:'get',
            data:{
                params:{
                    page:this.params.page,
                    pageSize:this.params.pageSize
                }
            }
        }).then((res)=>{
            if (res.code=='0'){
                res.result.list.map((item,index)=>{
                    item.key = index
                })
                this.setState({
                    daymicDatasource3:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current,pageSize)=>{
                        _this.params.page = current
                        _this.params.pageSize = pageSize
                        this.request3()
                    })

                })
            }
        })
    }



    onRowClick =(record,index)=>{
        let selectKey = [index]
        Modal.info({
            title:'信息',
            content:`用户名:${record.userName},爱好:${record.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem: record
        })

    }

    handleDelete = ()=>{
        let rows = this.state.selectedRows;
        let ids = []
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`你确定要删除这些数据吗?${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功')
                this.request()
            }
        })
    }

    render(){
        const columns=[
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }

        return(
            <div>
                <Card title="基础表格">
                    <Table
                        dataSource={this.state.dataSource}
                        columns={columns}
                        bordered={true}
                        pagination={false}
                    />
                </Card>

                <Card title="动态数据表格" style={{margin:'10px 0'}}>
                    <Table
                        dataSource={this.state.daymicDatasource}
                        columns={columns}
                        bordered={true}
                        pagination={false}
                    />
                </Card>

                <Card title="动态数据表格--单选按钮" style={{margin:'10px 0'}}>
                    <Table
                        dataSource={this.state.daymicDatasource}
                        columns={columns}
                        bordered={true}
                        pagination={false}
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                    />
                </Card>

                <Card title="动态数据表格--复选框" style={{margin:'10px 0'}}>
                    <div style={{marginBottom:10}}>
                        <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        dataSource={this.state.daymicDatasource}
                        columns={columns}
                        bordered={true}
                        pagination={false}
                        rowSelection={rowCheckSelection}

                    />
                </Card>

                <Card title="动态数据表格--分页" style={{margin:'10px 0'}}>
                    <div style={{marginBottom:10}}>
                        <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        dataSource={this.state.daymicDatasource3}
                        columns={columns}
                        bordered={true}
                        pagination={this.state.pagination}
                        rowSelection={rowCheckSelection}

                    />
                </Card>

            </div>
        )
    }

}

