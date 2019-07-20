import React from 'react'
import {Button,notification,Card} from 'antd'
import './ui.less'

export default class Notification extends React.Component {


    openNotification=(type,place)=>{

        if (place){
            notification.config({
                placement:place
            })
        }

        notification[type]({
            message:'发工资啦',
            description:'每个月的20号发工资,美滋滋'
        })
    }

    render(){
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification("success")} >Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification("info")} >Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification("warning")} >Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification("error")} >Error</Button>
                </Card>

                <Card title="通知提醒框2" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification("success","topLeft")} >Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification("info","topRight")} >Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification("warning","bottomLeft")} >Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification("error","bottomRight")} >Error</Button>
                </Card>
            </div>
        )
    }
}

