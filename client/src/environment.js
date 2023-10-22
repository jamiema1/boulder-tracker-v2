// TODO: automate this variable so that it automatically toggles when the
//       npm run deploy command is run
const local = true

const serverhost = "https://jamiema.ca"
const localhost = "http://localhost"
export const HOST_NAME = local ? localhost : serverhost

const localRoot = "http://localhost:3000/boulder-tracker-v2/"
const serverRoot = "https://jamiema1.github.io/boulder-tracker-v2/"
export const ROOT_NAME = local ? localRoot : serverRoot
