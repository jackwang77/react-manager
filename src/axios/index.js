import Jsonp from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from "../utils/utils";

export default class Axios {

    static requestList(_this,request){

        this.ajaxOther({
            url:request.url,
            method:request.method,
            data:request.data
        }).then((data)=>{
            let list = data.result.item_list.map((item,index)=>{
                item.key = index
                return item
            })
            _this.setState({
                list,
                pagination:Utils.paginationOther(data,(current,pageSize)=>{
                    _this.params.page = current
                    _this.params.pageSize = pageSize
                    _this.requestList()
                })
            })
        })
    }

    static jsonp(options){
        return new Promise(((resolve, reject) => {
            Jsonp(options.url,{

                param:'callback'
            },function (err, response) {

                if (response.status =='success'){
                    resolve(response)
                } else {
                    reject(response.message)
                }
            })
        }))
    }
    
    static ajax(options){

        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }

        let baseURL = "https://www.easy-mock.com/mock/5d2ed24459f2bb27b843f7f0/example"
        return new Promise(((resolve, reject) => {
            axios({
                url:options.url,
                method:options.method,
                baseURL:baseURL,
                params:(options.data && options.data.params) || ''
                
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status=='200'){
                    let res= response.data
                    if (res.code=='0'){
                        resolve(res)
                    } else {
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        }))
    }

    static ajaxOther(options){

        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseURL = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise(((resolve, reject) => {
            axios({
                url:options.url,
                method:options.method,
                baseURL:baseURL,
                params:(options.data && options.data.params) || ''

            }).then((response)=>{

                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }

                if (response.status=='200'){
                    let res= response.data
                    if (res.code=='0'){
                        resolve(res)
                    } else {
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        }))
    }

}