import Axios from "axios"
import {HOST_NAME} from "./environment.js"

export default Axios.create({
  baseURL: HOST_NAME,
})
