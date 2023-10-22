import React from "react"
import ReactDOM from "react-dom/client"
import {Auth0Provider} from "@auth0/auth0-react"
import App from "./App"
import "./App.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Auth0Provider
    domain="jamiema.us.auth0.com"
    clientId="QdycHaHMkS7kIDUxzSlmDS9nKafLKoTc"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/boulder-tracker-v2/",
    }}
  >
    <App />
  </Auth0Provider>
)
