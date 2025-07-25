import React from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {boulderEndpoint} from "modules/api/endpoints"

import {getBoulderTypeImage, getHexImage} from "modules/images/images"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons"

export default function ClimbInfo({climb}) {
  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint)
  )

  // TODO: Make the loading look nicer
  if (isLoadingBoulder) {
    return <div>Loading...</div>
  }

  const boulder = allBoulderData.data.data.find((boulder) => {
    return parseInt(boulder.id) === parseInt(climb.boulderId)
  })

  return (
    <div className="flex justify-between items-center h-16 mr-2 my-3
     rounded-2xl bg-customGrayDark drop-shadow">
      {/* TODO: jma - add back hover effect when onClick has behaviour
     scale-95 hover:scale-100 hover:cursor-pointer
      transition duration-700 ease-out"> */}
      <div className="flex h-full">
        <div className="w-8 rounded-l-2xl" 
          style={{backgroundColor: boulder.colour}} />
        <div className="flex items-center">
          <img className="m-2 w-8 h-8" src={getHexImage(boulder.rating)} />
          <img className="m-2 w-8 h-8" 
            src={getBoulderTypeImage(boulder.boulderType)} />
        </div>
      </div>
      <div className="mr-4">
        {climb.sends > 0 ? 
          <FontAwesomeIcon icon={faCheck} size="2xl"
            className="text-customSuccess" /> : 
          <FontAwesomeIcon icon={faXmark} size="2xl"
            className="text-customFailure" />
        }
      </div>
    </div>
  )
}
