import React, { useRef, useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { ChatEngine } from "react-chat-engine"

import { useAuth } from "../../Contexts/auth-context"
import { auth } from "../../firebase"

import "./chats.scss"

export default function Chats() {
  const didMountRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  async function getFile(url) {
    let response = await fetch(url)
    let data = await response.blob()
    return new File([data], "test.jpg", { type: "image/jpeg" })
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }

      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": "36b60644-9d17-4ef5-9f5f-2e922416f4f5",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData()
          formdata.append("email", user.email)
          formdata.append("username", user.email)
          formdata.append("secret", user.uid)

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name)

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": "7bac0cf6-8271-4e57-9518-99f7977e4318",
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("e", e.response))
          })
        })
    }
  }, [user, history])

  if (!user || loading)
    return (
      <div className="loading-container">
        <div className="loading-container-icon">Loading...</div>
      </div>
    )

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">GoogleChat</div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="36b60644-9d17-4ef5-9f5f-2e922416f4f5"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}
