import React, {useEffect} from 'react'

import {handleError, sessionEndpoint} from 'modules/api/endpoints'
import axios from 'modules/api/axios'
import {useQuery} from 'react-query'

import SessionStats from "modules/pages/sessionPage/sessionList/components/sessionStats"
import SessionView from 'modules/pages/sessionPage/components/sessionView'

export default function SessionInfo({session, setSession}) {

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
      const filteredSessionData = [...allSessionData.data.data]
        .reverse()
        .sort((session1, session2) =>
          new Date(session1.sessionStartTime) < 
          new Date(session2.sessionStartTime)
            ? 1
            : -1
        )
      setSession(filteredSessionData[0])
    }
  }, [isLoadingSession])
  
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
    <div className='flex flex-col m-8 rounded-3xl bg-customPrimary'>
      <div className='flex justify-between'>
        <h1>Current Session</h1>  
        
        <div>End Session</div>
      </div>
      <div className='flex'>
        <div className='flex-grow flex flex-col ml-4 mr-2'>
          <div className='my-4 rounded-xl bg-customSecondary'>
            <h2>Stats</h2>
            <SessionStats key={session.id} session={session} />
          </div>
          <div className='my-4 rounded-xl bg-customSecondary'>
            <h2>Grades</h2>
          </div>
          <div className='my-4 rounded-xl bg-customSecondary'>
            <h2>Map</h2>
          </div>
        </div>
        <div className='flex-grow m-4 ml-2 rounded-xl bg-customSecondary'>
          <SessionView session={session}/>
        </div>
      </div>
    </div>
  )
}
