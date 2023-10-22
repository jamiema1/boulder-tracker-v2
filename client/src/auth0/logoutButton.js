import React from "react"
import {useAuth0} from "@auth0/auth0-react"
import {ROOT_NAME} from "../environment.js"

function LogoutButton() {
  const {logout} = useAuth0()

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: ROOT_NAME,
          },
        })
      }
    >
      Log Out
    </button>
  )
}

export default LogoutButton
