import React from "react"
import { GoogleOutlined } from "@ant-design/icons"
import firebase from "firebase/app"

import { auth } from "../../firebase"

import "./login.scss"

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-page-card">
        <h2>Welcome to GoogleChat!</h2>

        <div
          className="login-page-card-button"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In with Google
        </div>

        <br />
      </div>
    </div>
  )
}
