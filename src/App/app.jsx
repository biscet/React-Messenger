import React, { Component } from "react"
import { hot } from "react-hot-loader"

import "./Static/Styles/app.scss"

import Main from "./Pages/Main/main"

export default hot(module)(
  class App extends Component {
    render() {
      return <Main />
    }
  }
)
