import React from "react"
import { GoogleOutlined } from "@ant-design/icons"

import firebase from "firebase/app"
import "firebase/auth"

import { auth } from "../../firebase"

import "./login.scss"

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider()

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Unichat!</h2>
        <div
          className="login-button google"
          onClick={() => auth.signInWithRedirect(provider)}
        >
          <GoogleOutlined /> Sign In with Google
        </div>
      </div>
    </div>
  )
}

export default Login
