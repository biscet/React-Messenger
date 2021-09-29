import React, { Component } from "react"
import { hot } from "react-hot-loader"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./Static/Styles/app.scss"

import { AuthProvider } from "./Contexts/auth-context"

import Login from "./Pages/Login/login"
import Chats from "./Pages/Chats/chats"

export default hot(module)(
  class App extends Component {
    render() {
      return (
        <div className="app">
          <Router>
            <AuthProvider>
              <Switch>
                <Route path="/chats" component={Chats} />
                <Route path="/" component={Login} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      )
    }
  }
)
