import React from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"

import App from "./App/app"

ReactDOM.render(
  <Router className="router">
    <App path="/" />
  </Router>,
  document.getElementById("app")
)
