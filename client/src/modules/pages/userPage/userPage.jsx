import React from "react"

export default function UserPage() {
  let key = crypto.randomUUID().replace(/-/g, "")

  return (
    <div className="page">
      <div className="pageTitle">Users</div>
      <div>{key}</div>
    </div>
  )
}
