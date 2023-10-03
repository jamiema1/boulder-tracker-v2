import React from "react"
import Sessions from "./sessionPageComponents/sessions"
import "./gymPage.css"

export default function SessionPage() {
  return (
    <div>
      <div className="pageTitle">Sessions</div>
      <Sessions></Sessions>
    </div>
  )
}
