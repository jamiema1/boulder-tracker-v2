import Axios from "./axios.js"

export const gymEndpoint = "/gym"
export const locationEndpoint = "/location"
export const boulderEndpoint = "/boulder"
export const sessionEndpoint = "/session"
export const climbEndpoint = "/climb"

/*
 * APIs
 */

export function get(endpoint, id, setData) {
  Axios.get(endpoint + "/" + id)
    .then((res) => {
      setData(res.data.data)
    })
    .catch((err) => {
      alert(err.response.data.error)
    })
}

export function getAll(endpoint, setData) {
  Axios.get(endpoint)
    .then((res) => {
      setData(res.data.data)
    })
    .catch((err) => {
      alert(err.response.data.error)
    })
}

export function add(endpoint, newData, setData, data, clearRefs) {
  Axios.post(endpoint, newData)
    .then((res) => {
      setData([...data, {id: res.data.data[0].id, ...newData}])
      clearRefs()
      // alert("Successfully added gym " + res.data.data[0].id)
    })
    .catch((err) => {
      alert(err.response.data.error)
    })
}

export function edit(endpoint, id, newData, setData, clearRefs) {
  Axios.put(endpoint + "/" + id, newData)
    .then((res) => {
      clearRefs()
      if (res.status === 202) {
        alert(res.data.error)
        return
      }
      // TODO: update the gym from gymData without GET API call
      getAll(endpoint, setData)
      // alert("Successfully edited gym " + res.data.data[0].id)
    })
    .catch((err) => {
      alert(err.response.data.error)
    })
}

export function remove(endpoint, id, setData) {
  Axios.delete(endpoint + "/" + id)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      // TODO: remove the gym from gymData without GET API call
      getAll(endpoint, setData)
      // alert("Successfully removed gym " + res.data.data[0].id)
    })
    .catch((err) => {
      alert(err.response.data.error)
    })
}
