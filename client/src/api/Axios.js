import Axios from "axios";

// TODO: need to make the serverhost name start with https
const serverhost = "http://35.163.119.158:3001";
const localhost = "http://localhost:3001";

let hostname;

// TODO: automate this variable so that it automatically toggles when the
//       npm run deploy command is run
const local = false;
localStorage.setItem("adminStatus", "false");

if (local) {
  hostname = localhost;
} else {
  hostname = serverhost;
}

export default Axios.create({
  baseURL: hostname,
});
