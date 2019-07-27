import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
    formateDate(time){
        if (!time) return ''
        let date = new Date(time)
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay()+' '+date.getHours()+":"+date.getMinutes()+':'+date.getSeconds()
    },
    pagination(data,callback){

        return {
            onChange:(current,pageSize)=>{
                callback(current,pageSize)
            },
            onShowSizeChange:(current,pageSize)=>{
                callback(current,pageSize)
            },
            current:data.result.pageIndex,
            pageSize:data.result.pageSize,
            total:data.result.total,
            showSizeChanger:true,
            showTotal:()=>{
                return `共${data.result.total}条`
            },
            showQuickJumper:true
        }
    },
    paginationOther(data,callback){
        return {
            onChange:(current,pageSize)=>{
                callback(current,pageSize)
            },
            onShowSizeChange:(current,pageSize)=>{
                callback(current,pageSize)
            },
            showSizeChanger:true,
            current:data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if (!data){
            return []
        }
        let options=[]
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options
    },
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if (selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
    }
}