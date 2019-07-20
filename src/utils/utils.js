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
}