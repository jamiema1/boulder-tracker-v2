import React from "react"
import {Auth0Provider} from "@auth0/auth0-react"
import {CLIENT_ID, DOMAIN, ROOT_NAME} from "modules/api/environment.js"
import "bootstrap/dist/css/bootstrap.min.css"
import PageRouter from "modules/common/components/pageRouter"
import "app.css"
import {QueryClient, QueryClientProvider} from "react-query"
import {ModalProvider} from "modules/common/components/modal/modalContext"
import Modal from "modules/common/components/modal/modal"

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
    <div className="text-customDark font-montserrat bg-customGrayDark">
      <Auth0Provider
        domain={DOMAIN}
        clientId={CLIENT_ID}
        authorizationParams={{
          redirect_uri: ROOT_NAME,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <Modal />
            <PageRouter />
          </ModalProvider>
        </QueryClientProvider>
      </Auth0Provider>

    </div>
  )
}
