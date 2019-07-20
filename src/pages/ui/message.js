import React from 'react'
import {Card,Button,message} from 'antd'
import './ui.less'

export default class Message extends React.Component{

    openMessage=(type)=>{
        message[type]("这个是我提醒的消息")
    }

    render(){
        return(
            <div>
                <Card title="Message通知" className="card-wrap">
                  <Button type="primary" onClick={()=>this.openMessage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openMessage('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openMessage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.openMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}