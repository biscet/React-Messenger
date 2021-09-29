import React from "react"
import Fade from "react-reveal/Fade"

import "./header.scss"

export default function Header() {
  return (
    <header className="header">
      <Fade>
        <div>App</div>
      </Fade>
    </header>
  )
}
