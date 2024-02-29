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
    <div className="flex justify-between items-center h-16
    rounded-2xl my-3 bg-customGrayDark mr-2">
      <div className="flex">
        <div className="w-8 rounded-l-2xl" 
          style={{backgroundColor: boulder.colour}} />
        <img className="m-2 w-12 h-12" src={getHexImage(boulder.rating)} />
        <img className="m-2 w-12 h-12" 
          src={getBoulderTypeImage(boulder.boulderType)} />

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
