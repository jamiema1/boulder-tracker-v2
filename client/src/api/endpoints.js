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
    .catch((error) => {
      handleError(error)
    })
}

export function getAll(endpoint, setData) {
  Axios.get(endpoint)
    .then((res) => {
      setData(res.data.data)
    })
    .catch((error) => {
      handleError(error)
    })
}

export function getQuery(endpoint, params, setData) {
  Axios.get(endpoint + "/query/" + encodeURIComponent(JSON.stringify(params)))
    .then((res) => {
      setData(res.data.data)
    })
    .catch((err) => {
      alert(err.response.data.error)
    })
}

export function add(endpoint, newData, data, setData, clearRefs) {
  Axios.post(endpoint, newData)
    .then((res) => {
      setData([{id: res.data.data[0].id, ...newData}, ...data])
      clearRefs()
    })
    .catch((error) => {
      handleError(error)
    })
}

export function edit(endpoint, id, newData, data, setData, clearRefs) {
  Axios.put(endpoint + "/" + id, newData)
    .then((res) => {
      clearRefs()
      if (res.status === 202) {
        alert(res.data.error)
        return
      }
      newData.id = res.data.data[0].id

      let newArray = data.map((item) => {
        return item.id === id ? newData : item
      })
      setData(newArray)
    })
    .catch((error) => {
      handleError(error)
    })
}

export function remove(endpoint, id, data, setData) {
  Axios.delete(endpoint + "/" + id)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      let newArray = data.filter((item) => {
        return item.id !== id
      })
      setData(newArray)
    })
    .catch((error) => {
      handleError(error)
    })
}

function handleError(error) {
  alert(error.message + " : " + error.response.data.error)
}
