import React from 'react'
import {Card,Button,Table,Form,Select,Modal,message,DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable'
const FormItem = Form.Item
const Option = Select.Option

export default class Order extends React.Component{

    state={
        orderInfo:{},
        orderConfirmVisible:false
    }
    params={
        page:1,
        pageSize:10
    }

    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[
                {
                    id:'0',
                    name:'全部'
                },
                {
                    id:'1',
                    name:'北京'
                },
                {
                    id:'2',
                    name:'天津'
                },
                {
                    id:'3',
                    name:'上海'
                }
            ]
        },
        {
            type:'时间查询'
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'1',
            width:120,
            list:[
                {
                    id:'0',
                    name:'全部'
                },
                {
                    id:'1',
                    name:'进行中'
                },
                {
                    id:'2',
                    name:'结束行程'
                }
            ]
        }
    ]


    componentDidMount(){
        this.requestList()
    }

    filterSubmit = (params)=>{

        Object.assign(this.params,this.params,params)
        this.requestList()
    }

    requestList=()=>{
        let _this = this
        var request={
            url:'order/list',
            method:'get',
            data:{
                params:this.params
            }
        }
        axios.requestList(this,request)
    }

    onRowClick=(record,index)=>{
        let selectKey = [index]
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }

    handleConfig=()=> {
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajaxOther({
            url: '/order/ebike_info',
            method: 'get',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == '0') {
                this.setState({
                    orderConfirmVisible: true,
                    orderInfo: res.result
                })
            }
        })

    }

    handleFinishOrder=()=>{
        let item = this.state.selectedItem
        axios.ajaxOther({
            url:'/order/finish_order',
            method:'get',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if(res.code==0){
                message.success("订单结束成功")
                this.setState({
                    orderConfirmVisible:false
                })
                this.requestList()
            }
        })
    }

    openOrderDetail=()=>{
        let item = this.state.selectedItem
        if (!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return
        }
        window.open(`#/common/order/detail/${item.id}`,'_blank')
    }

    render(){

        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]

        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }

        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection={
            type:'radio',
            selectedRowKeys
        }

        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.filterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfig}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                        pagination={this.state.pagination}
                    />
                    {/*<Table
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                    onRow={(record,index)=>{
                        return {
                            onClick:()=>{
                                this.onRowClick(record,index)
                            }
                        }
                    }}
                    />*/}

                </div>

                <Modal
                 title="结束订单"
                 visible={this.state.orderConfirmVisible}
                 onCancel={()=>{
                     this.setState({
                         orderConfirmVisible:false
                     })
                 }}
                 onOk={this.handleFinishOrder}
                 width={600}
                >
                    <Form>
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>

                </Modal>

            </div>
        )
    }

}

class FilterForm extends React.Component{

    render(){
        const {getFieldDecorator} = this.props.form
        return(
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select style={{width:100}}
                                    placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">天津</Option>
                                <Option value="3">深圳</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="开始时间">
                    {
                        getFieldDecorator('time_start')(
                           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="结束时间">
                    {
                        getFieldDecorator('time_end')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('order_status')(
                            <Select style={{width:100}}
                                    placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">已完成</Option>
                                <Option value="2">未完成</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm)
