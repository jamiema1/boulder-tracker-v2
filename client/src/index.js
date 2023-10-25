import React from "react"
import ReactDOM from "react-dom/client"
import {Auth0Provider} from "@auth0/auth0-react"
import {ROOT_NAME} from "./environment.js"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App.js"
import "./App.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Auth0Provider
    domain="jamiema.us.auth0.com"
    clientId="QdycHaHMkS7kIDUxzSlmDS9nKafLKoTc"
    authorizationParams={{
      redirect_uri: ROOT_NAME,
    }}
  >
    <App />
  </Auth0Provider>
)
