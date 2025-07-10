/*
 * Endpoints
 */

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
