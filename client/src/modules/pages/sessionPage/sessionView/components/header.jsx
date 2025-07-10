import React from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {
  gymEndpoint,
  handleError,
} from "modules/api/endpoints"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom"

export default function Header({session}) {
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
    navigate("/sessions")
  }

  /*
   * Return Value
   */

  if (isLoadingGym) {
    return <div>Loading...</div>
  }

  return (
    <div 
      style={{width: "calc(100vw - 256px)"}}
      className="flex justify-between items-center h-[8vh] 
      border-b border-solid border-customDark bg-customLight"
    >
      <div className="flex items-center ml-[30px]">
        <div 
          className="flex items-center justify-center w-10 h-10
          transition duration-700 ease-in-out
          rounded-full hover:bg-customGrayDark hover:cursor-pointer"
          onClick={() => navigateSession()}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={"lg"}
          />
        </div>
        <div className="font-medium text-4xl mx-3">
          Session 
          {/* TODO: jma - text should vary based on how long ago session was */}
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
      <div></div>
      {/* TODO: jma - re-implement later
      <div>End Session
      </div> */}
    </div>
  )
}
