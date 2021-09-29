import React, { Component } from "react"
import { hot } from "react-hot-loader"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./Static/Styles/app.scss"

import Login from "./Pages/Login/login"

export default hot(module)(
  class App extends Component {
    render() {
      return (
        <div className="app">
          <Router>
            <Switch>
              <Route path="/" component={Login} />
            </Switch>
          </Router>
        </div>
      )
    }
  }
)
