import axios from "api/axios"

export const gymEndpoint = "/gym"
export const locationEndpoint = "/location"
export const boulderEndpoint = "/boulder"
export const sessionEndpoint = "/session"
export const climbEndpoint = "/climb"

/*
 * APIs
 */

export const handleError = (error) => {
  console.log(error.message + ": " + error.response.data.error)
  alert(error.message + ": " + error.response.data.error)
}

// export function get(endpoint, cache, cacheKey, id, setData) {
//   Axios.get(endpoint + "/" + id)
//     .then((res) => {
//       setData(res.data.data)
//       cache[cacheKey] = res.data.data
//     })
//     .catch((error) => {
//       handleError(error)
//     })
// }

// export function getAll(endpoint, cache, cacheKey, setData) {
//   Axios.get(endpoint)
//     .then((res) => {
//       setData(res.data.data)
//       cache[cacheKey] = res.data.data
//     })
//     .catch((error) => {
//       handleError(error)
//     })
// }

// export function getQuery(endpoint, cache, cacheKey, params, setData) {
//  Axios.get(endpoint + "/query/" + encodeURIComponent(JSON.stringify(params)))
//     .then((res) => {
//       setData(res.data.data)
//       cache[cacheKey] = res.data.data
//     })
//     .catch((err) => {
//       alert(err.response.data.error)
//     })
// }

// export function add(
//   endpoint,
//   cache,
//   cacheKey,
//   newData,
//   data,
//   setData,
//   clearRefs
// ) {
//   Axios.post(endpoint, newData)
//     .then((res) => {
//       setData([{id: res.data.data[0].id, ...newData}, ...data])
//       cache[cacheKey] = [{id: res.data.data[0].id, ...newData}, ...data]
//       clearRefs()
//     })
//     .catch((error) => {
//       handleError(error)
//     })
// }

// export function edit(
//   endpoint,
//   cache,
//   cacheKey,
//   id,
//   newData,
//   data,
//   setData,
//   clearRefs
// ) {
//   Axios.put(endpoint + "/" + id, newData)
//     .then((res) => {
//       clearRefs()
//       if (res.status === 202) {
//         alert(res.data.error)
//         return
//       }
//       newData.id = res.data.data[0].id

//       let newArray = data.map((item) => {
//         return item.id === id ? newData : item
//       })
//       setData(newArray)
//       cache[cacheKey] = newArray
//     })
//     .catch((error) => {
//       handleError(error)
//     })
// }

// export function remove(endpoint, cache, cacheKey, id, data, setData) {
//   Axios.delete(endpoint + "/" + id)
//     // eslint-disable-next-line no-unused-vars
//     .then((res) => {
//       let newArray = data.filter((item) => {
//         return item.id !== id
//       })
//       setData(newArray)
//       cache[cacheKey] = newArray
//     })
//     .catch((error) => {
//       handleError(error)
//     })
// }

export function get(endpoint, dataCentral, setDataCentral, setData) {
  if (dataCentral.length) {
    setData([...dataCentral])
  } else {
    axios.get(endpoint).then((res) => {
      setDataCentral([...res.data.data])
      setData([...res.data.data])
    })
  }
}

export function add(
  endpoint,
  dataCentral,
  setDataCentral,
  newData,
  setData,
  clearRefs
) {
  axios.post(endpoint, newData).then((res) => {
    const newArray = [
      ...dataCentral,
      {
        id: res.data.data[0].id,
        ...newData,
      },
    ]

    setDataCentral(newArray)
    setData(newArray)
    clearRefs()
  })
}

export function remove(endpoint, id, dataCentral, setDataCentral, setData) {
  axios
    .delete(endpoint + "/" + id)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      const newArray = [...dataCentral].filter((item) => {
        return item.id !== id
      })
      setDataCentral(newArray)
      setData(newArray)
    })
    .catch((error) => {
      handleError(error)
    })
}

export function edit(
  endpoint,
  id,
  dataCentral,
  setDataCentral,
  newData,
  setData,
  clearRefs
) {
  axios
    .put(endpoint + "/" + id, newData)
    .then((res) => {
      clearRefs()
      if (res.status === 202) {
        alert(res.data.error)
        return
      }
      newData.id = res.data.data[0].id

      const newArray = [...dataCentral].map((item) => {
        return item.id === id ? newData : item
      })
      setDataCentral(newArray)
      setData(newArray)
    })
    .catch((error) => {
      handleError(error)
    })
}
