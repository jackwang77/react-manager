import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './Admin'
import Buttons from './pages/ui/buttons'
import Modal from './pages/ui/modals'
import NoMatch from './pages/noMatch'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Message from './pages/ui/message'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousels'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'

export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/common" render={()=>

                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                            </Common>
                        }/>
                        <Route path="/login" component={Login}/>
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                <Route path="/ui/buttons" component={Buttons}/>
                                    <Route path="/ui/modals" component={Modal}  />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notification}/>
                                    <Route path='/ui/messages' component={Message}/>
                                    <Route path='/ui/tabs' component={Tabs}/>
                                    <Route path='/ui/gallery' component={Gallery}/>
                                    <Route path='/ui/carousel' component={Carousel}/>
                                    <Route path='/form/login' component={FormLogin}/>
                                    <Route path='/form/reg' component={FormRegister}/>
                                    <Route path='/table/basic' component={BasicTable}/>
                                    <Route path='/table/high' component={HighTable}/>
                                    <Route path='/city' component={City} />
                                    <Route path='/order' component={Order}/>
                                    <Route path='/user' component={User} />
                                <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}