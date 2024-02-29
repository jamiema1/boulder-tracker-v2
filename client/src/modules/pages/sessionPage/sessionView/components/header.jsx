import React from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {
  gymEndpoint,
  handleError,
} from "modules/api/endpoints"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons"

export default function Header({session}) {
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
    <div 
      style={{width: "calc(100vw - 280px)"}}
      className="flex justify-between items-center h-[8vh] 
      border-b border-solid border-customDark bg-customLight"
    >
      <div className="flex items-center ml-[30px]">
        <FontAwesomeIcon icon={faChevronLeft} size={"lg"}/>
        <div className="font-medium text-4xl mx-3">
          Today's Session
        </div>
        <div className="text-2xl mx-2">
          {new Date(session.sessionStartTime).toLocaleDateString()}
        </div>
      </div>
      <div className="font-medium text-4xl">
        {
          allGymData.data.data.find((gym) => 
            parseInt(gym.id) === parseInt(session.gymId)
          )?.city
        }

      </div>
      <div>End Session
      </div>
    </div>
  )
}
