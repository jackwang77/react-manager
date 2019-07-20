import React from 'react'
import {HashRouter as Router,Route,Link} from 'react-router-dom'
import Main from "./Main";
import About from "../router1/About";
import Topic from "../router1/Topic";
import Home from './Home'
export default class IRouter extends React.Component{

    render(){

        return(
            <Router>
                <Home>
                    <Route  path="/main" render={()=>
                        <Main>
                            <Route path='/main/a' component={About}/>
                        </Main>
                    }/>
                    <Route path="/about" component={About}/>
                    <Route path="/topic" component={Topic}/>
                </Home>
            </Router>
        )
    }
}