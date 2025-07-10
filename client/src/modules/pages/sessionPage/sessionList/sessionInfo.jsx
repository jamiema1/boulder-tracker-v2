import React from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {
  gymEndpoint,
  handleError,
} from "modules/api/endpoints"
import {useNavigate} from "react-router-dom"


export default function SessionInfo({session}) {
  /*
   * React Query Hooks & APIs
   */

  const navigate = useNavigate()

  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => axios.get(gymEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Helper Functions
   */

  function navigateSession() {
    navigate(`/sessions/${session.id}`)
  }


  /*
   * Return Value
   */

  if (isLoadingGym) {
    return <div>Loading...</div>
  }

  return (
    <div
      className="flex justify-between items-center h-16 my-3 mr-2 px-4
        rounded-2xl drop-shadow-md bg-customGrayDark scale-95
        hover:scale-100 hover:cursor-pointer transition duration-700 ease-out"
      onClick={() => navigateSession()}>
      <div>{new Date(session.sessionStartTime).toLocaleDateString()}</div>
      <div>
        {
          allGymData.data.data.find((gym) => {
            return parseInt(gym.id) === parseInt(session.gymId)
          })?.city
        }
      </div>
    </div>
  )
}
