import React from 'react'
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import Main from './Main'
import Info from './Info'
import About from "../router1/About";
import Topic from "../router1/Topic";
import Home from './Home'
import NoMatch from './NoMatch'

export default class IRouter extends React.Component{

    render(){
        return(
            <Router>
                <Home>
                    <Switch>
                        <Route path='/main' render={()=>
                            <Main>
                                <Route path='/main/:value' component={Info}/>
                            </Main>
                        }>
                        </Route>
                        <Route path='/about' component={About} />
                        <Route exact={true} path='/about/abc' component={About}/>
                        <Route path='/topic' component={Topic}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Home>
            </Router>
        )
    }

}