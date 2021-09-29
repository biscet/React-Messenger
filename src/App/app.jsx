import React, { Component } from "react"
import { hot } from "react-hot-loader"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./Static/Styles/app.scss"

import Main from "./Pages/Main/main"

export default hot(module)(
  class App extends Component {
    render() {
      return (
        <div className="app">
          <Router>
            <Switch>
              <Route path="/" component={Main} />
            </Switch>
          </Router>
        </div>
      )
    }
  }
)
