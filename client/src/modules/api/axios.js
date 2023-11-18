import Axios from "axios"
import {HOST_NAME} from "modules/api/environment"

export default Axios.create({
  baseURL: HOST_NAME,
})
