import React from "react"

import Button from "react-bootstrap/Button"

import {useAuth0} from "@auth0/auth0-react"

function LoginButton() {
  const {loginWithRedirect} = useAuth0()

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>
}

export default LoginButton
