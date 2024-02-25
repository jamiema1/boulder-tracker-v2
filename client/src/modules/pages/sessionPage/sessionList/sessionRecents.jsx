import React from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {
  gymEndpoint,
  handleError,
} from "modules/api/endpoints"


export default function SessionRecents({session}) {
  /*
   * React Query Hooks & APIs
   */

  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => axios.get(gymEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Return Value
   */

  if (isLoadingGym) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-between rounded-xl bg-customSecondary 
      my-2 mx-4 p-2">
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
