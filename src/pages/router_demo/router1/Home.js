import React from 'react'
import Main from './Main'
import About from './About'
import Topic from './Topic'
import {HashRouter,Route,Link} from 'react-router-dom'

export default class Home extends React.Component{

    render(){
        return (
            <div>
                <HashRouter>
                  <div>
                      <ul>
                          <li>
                              <Link to="/">Home</Link>
                          </li>
                          <li>
                              <Link to="/about">About</Link>
                          </li>
                          <li>
                              <Link to="/topic">Topic</Link>
                          </li>
                      </ul>
                      <hr/>

                      <Route exact={true} path="/" component={Main}></Route>
                      <Route path="/about" component={About}/>
                      <Route path="/topic" component={Topic}/>
                
                  </div>
                </HashRouter>
            </div>
        )
    }

}