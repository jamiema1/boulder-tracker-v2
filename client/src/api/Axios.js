import Axios from "axios"

const serverhost = "https://jamiema.ca"
const localhost = "http://localhost"

// TODO: automate this variable so that it automatically toggles when the
//       npm run deploy command is run
const local = true

export default Axios.create({
  baseURL: local ? localhost : serverhost,
})
