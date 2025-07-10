import React from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {
  climbEndpoint,
  handleError,
} from "modules/api/endpoints"

import Card from "./card"

export default function Cards({session}) {
  /*
   * React Query Hooks & APIs
   */

  // const [sends, setSends] = useState(0)
  // const [attempts, setAttempts] = useState(0)
  // const [climbs, setClimbs] = useState(0)

  const {isLoading: isLoadingClimb, data: allClimbData} = useQuery(
    climbEndpoint,
    () => axios.get(climbEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  // useEffect(() => {
    
  //   console.log("compute")
  const filteredClimbData = isLoadingClimb ? [] : 
    [...allClimbData.data.data].filter((climb) => {
      return parseInt(climb.sessionId) === parseInt(session.id)
    })

  let climbs = 0, 
    attempts = 0,
    sends = 0

  filteredClimbData.forEach((climb) => {
    climbs += 1
    attempts += climb.attempts
    sends += climb.sends
  })

  // setAttempts(attempts)
  // setClimbs(climbs)
  // setSends(sends)
  // }, [isLoadingClimb, session])
  // TODO: jma - removing useEffect and useState to ensure cards update
  //  when climbs within a session change

  /*
   * Return Value
   */

  if (isLoadingClimb) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex-grow grid grid-cols-3'>
      <Card data={climbs} title={"Climbs"}/>
      <Card data={sends} title={"Sends"} />
      <Card data={attempts} title={"Attempts"} />
    </div>
  )
}
