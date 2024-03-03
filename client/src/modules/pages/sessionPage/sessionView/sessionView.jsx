import React, {useEffect, useState} from 'react'

import {handleError, sessionEndpoint} from 'modules/api/endpoints'
import axios from 'modules/api/axios'
import {useQuery} from 'react-query'

import ClimbHistory from 'modules/pages/sessionPage/sessionView/components/climbHistory'
import Header from './components/header'
import Cards from './components/cards'
import GradeDistribution from './components/gradeDistribution'
import {useLocation, useNavigate} from 'react-router-dom'
import Timeline from './components/timeline'

export default function SessionView() {

  const location = useLocation()
  const sessionId = location.pathname.split("/")[2]

  const navigate = useNavigate()

  const [session, setSession] = useState()
  
  const {
    isLoading: isLoadingSession,
    isError: isErrorSession,
    data: allSessionData,
    error: errorSession,
  } = useQuery(sessionEndpoint, () => axios.get(sessionEndpoint), {
    onError: (error) => handleError(error),
  })
  
  
  useEffect(() => {
    if (!isLoadingSession) {
      const newSession = [...allSessionData.data.data]
        .find((session) => session.id == sessionId)
    
      if (newSession == undefined) {
        navigate("/sessions", {replace:true})
      } 

      setSession(newSession)
    }

  }, isLoadingSession)

  /*
   * Return value
   */

  if (isLoadingSession || session == undefined) {
    return <div>Loading...</div>
  }

  if (isErrorSession) {
    return (
      <div>
        Error: {errorSession.message} | {errorSession.response.data.error}
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <Header session={session}/>
      <div className='flex h-[92vh] p-[15px]'>
        <div className='flex-grow-[7] grid grid-rows-2'>
          <div className='grid grid-cols-2'>
            <GradeDistribution session={session} />
            <div className='flex-grow flex flex-col'>
              <Cards session={session} />
              <Timeline session={session}/>
            </div>
          </div>
          <div className='content'>
            <h1>Map</h1>
          </div>
        </div>
        <div className='content flex-grow-[3]'>
          <ClimbHistory session={session}/>
        </div>
      </div>
    </div>
  )
}
