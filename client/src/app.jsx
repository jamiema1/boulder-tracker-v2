import React from "react"
import {Auth0Provider} from "@auth0/auth0-react"
import {ROOT_NAME} from "modules/api/environment.js"
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "modules/common/components/navBar"
import PageRouter from "modules/common/components/pageRouter"
import "app.css"
import {QueryClient, QueryClientProvider} from "react-query"
import "app.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
      // cacheTime: 0,
    },
  },
})

export default function App() {
  return (
    <Auth0Provider
      domain="jamiema.us.auth0.com"
      clientId="QdycHaHMkS7kIDUxzSlmDS9nKafLKoTc"
      authorizationParams={{
        redirect_uri: ROOT_NAME,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <NavBar></NavBar>
        <PageRouter></PageRouter>
      </QueryClientProvider>
    </Auth0Provider>
  )
}
