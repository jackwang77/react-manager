import React from 'react';
import { Card, Button, Modal,Form, Input, Radio, DatePicker, Select,message} from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends React.Component{

    params={
        page:1,
        pageSize:10
    }

    state={
        isVisible:false
    }

    formList=[
        {
            type:"INPUT",
            label:'用户名',
            field:'username',
            placeholder:'请输入用户名',
            width:130,
        },
        {
            type:"INPUT",
            label:'用户手机号码',
            field:'phone',
            placeholder:'请输入手机号码',
            width:130,
        },
        {
            type:"DATE",
            label:'请选择入职时间',
            field:'userDate',
            placeholder:'请输入日期',
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
        var request={
            url:'/user/list',
            method:'get',
            data:{
                params:this.params
            }
        }
        axios.requestList(this,request)
    }

    handOperate=(type)=>{
        let item = this.state.selectedItem
        if (type=='create'){
            this.setState({
                title:'创建员工',
                type,
                isVisible:true
            })
        } else if (type=='edit'){
            if (!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                title:'编辑员工',
                type,
                isVisible:true,
                userInfo:item[0]
            })
        } else if (type=='detail'){
            if (!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                title:'员工详情',
                type,
                isVisible:true,
                userInfo:item[0]
            })
        } else {
            if (!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            let _this = this
            Modal.confirm({
                title:'确定删除?',
                content:'是否要删除当前选中的员工',
                onOk(){
                    axios.ajaxOther({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item[0].id
                            }
                        },
                        method:'get'
                    }).then((res)=>{
                        if (res.code==0){
                            _this.setState({
                                isVisible:false
                            })
                            message.success("删除成功")
                            _this.requestList()
                        }
                    })
                }
            })
        }
    }

    handleSubmit = ()=>{
        let type = this.state.type
        let data = this.userForm.props.form.getFieldsValue()
        axios.ajaxOther({
            url:type == 'create' ? '/user/add' : '/user/edit',
            method:'get',
            data:{
                params:data
            }
        }).then((res)=>{
            if (res.code==0){
                this.userForm.props.form.resetFields()
                this.setState({
                    isVisible:false
                })
                message.success(type == 'create' ? '添加成功' : '更新成功')
                this.requestList()
            }
        })
    }

    handleDelete = (item)=>{
        if (!item){
            Modal.info({
                title:'提示',
                content:'请选择一个用户'
            })
            return;
        }
        let _this = this
        Modal.confirm({
            title:'确定删除?',
            content:`是否要删除当前选中的员工:${item.username}`,
            onOk(){
                axios.ajaxOther({
                    url:'/user/delete',
                    data:{
                        params:{
                            id:item.id
                        }
                    },
                    method:'get'
                }).then((res)=>{
                    if (res.code==0){
                        _this.setState({
                            isVisible:false
                        })
                        message.success("删除成功")
                        _this.requestList()
                    }
                })
            }
        })
    }

    handleEdit = (item)=>{
        if (!item){
            Modal.info({
                title:'提示',
                content:'请选择一个用户'
            })
            return;
        }
        this.setState({
            title:'编辑员工',
            type:'edit',
            isVisible:true,
            userInfo:item
        })
    }

    handleDetail=(item)=>{
        if (!item){
            Modal.info({
                title:'提示',
                content:'请选择一个用户'
            })
            return;
        }
        this.setState({
            title:'员工详情',
            type:'detail',
            isVisible:true,
            userInfo:item
        })
    }


    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id',
                render: text => <a href="javascript:;">{text}</a>
            },{
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    return {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子一枚',
                        '4':'百度FE',
                        '5':'创业者'
                    }[state]
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }[interest]
                }
            }, {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
            }, {
                title: '操作',
                render: (text, item) => {

                    return (
                        <div>
                            <Button style={{marginRight:10}} size="small" onClick={this.handleEdit.bind(this, item)}>编辑</Button>
                            <Button style={{marginRight:10}} size="small" onClick={this.handleDetail.bind(this, item)}>详情</Button>
                            <Button style={{marginRight:10}} size="small" onClick={this.handleDelete.bind(this, item)}>删除</Button>
                        </div>


                    )

                }
            }
        ]
        let footer = {}
        if (this.state.type == 'detail'){
            footer = {
                footer:null
            }
        }

        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.filterSubmit}/>
                </Card>

                <Card style={{marginTop:10,marginRight:10}}>
                    <Button type="primary" icon="plus" onClick={()=>this.handOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={()=>this.handOperate('edit')}>编辑员工</Button>
                    <Button type="primary" icon="gold" onClick={()=>this.handOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={()=>this.handOperate('delete')}>删除员工</Button>
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
                        rowSelection='checkbox'
                    />
                </div>

                <Modal
                  title={this.state.title}
                  visible={this.state.isVisible}
                  onOk={this.handleSubmit}
                  onCancel={()=>{
                      this.userForm.props.form.resetFields()
                      this.setState({
                          isVisible:false
                      })
                  }}
                  width={600}
                  {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>{this.userForm = inst;}}/>
                </Modal>

            </div>
        )
    }

}

class UserForm extends React.Component{

    getState = (state)=>{
        return{
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }

    render(){
        let type = this.props.type
        let userInfo = this.props.userInfo || {}
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <Form>
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type =='detail' ? userInfo.username :
                        getFieldDecorator('username',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                            getFieldDecorator('sex',{
                                initialValue:userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator('state',{
                                initialValue: userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>咸鱼一条</Option>
                                    <Option value={2}>风华浪子</Option>
                                    <Option value={3}>北大才子一枚</Option>
                                    <Option value={4}>百度FE</Option>
                                    <Option value={5}>创业者</Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                            getFieldDecorator('birthday',{
                                initialValue: moment(userInfo.birthday)
                            })(
                                <DatePicker />
                            )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                            getFieldDecorator('address',{
                                initialValue: userInfo.address
                            })(
                                <TextArea rows={3} placeholder="请输入联系地址"/>
                            )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)