import React from "react"
import {useAuth0} from "@auth0/auth0-react"
import {ROOT_NAME} from "../api/environment.js"
import Button from "react-bootstrap/Button"

function LogoutButton() {
  const {logout} = useAuth0()

  return (
    <Button
      variant="danger"
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: ROOT_NAME,
          },
        })
      }
    >
      Log Out
    </Button>
  )
}

export default LogoutButton
