import React, {useEffect} from 'react'

import {handleError, sessionEndpoint} from 'modules/api/endpoints'
import axios from 'modules/api/axios'
import {useQuery} from 'react-query'

import ClimbHistory from 'modules/pages/sessionPage/sessionView/components/climbHistory'
import Header from './components/header'

export default function SessionView({session, setSession}) {

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
    <div className='flex flex-col'>
      <Header session={session}/>
      <div className='flex h-[92vh] p-[15px]'>
        <div className='flex-grow-[7] flex flex-col'>
          <div className='flex-grow-[3] flex'>
            <div className='flex-grow m-[15px] p-[15px] rounded-[20px]
             bg-customLight'>
              <h1>Grade Distribution</h1>
            </div>
            <div className='flex-grow flex flex-col'>
              <div className='flex-grow flex'>
                <div className='flex-grow m-[15px] p-[15px] rounded-[20px]
             bg-customLight'>
                  <h1>Climbs</h1>
                </div>
                <div className='flex-grow m-[15px] p-[15px] rounded-[20px]
             bg-customLight'>
                  <h1>Sends</h1>
                </div>
                <div className='flex-grow m-[15px] p-[15px] rounded-[20px]
             bg-customLight'>
                  <h1>Attempts</h1>
                </div>
              </div>
              <div className='flex-grow-[2] m-[15px] p-[15px] rounded-[20px]
             bg-customLight'>
                <h1>Timeline</h1>
              </div>
            </div>
          </div>
          <div className='flex-grow-[4] m-[15px] p-[15px] rounded-[20px]
             bg-customLight'>
            <h1>Map</h1>
          </div>
        </div>
        <div className='flex-grow-[3] m-[15px] p-[15px] rounded-[20px]
             bg-customLight'>
          <ClimbHistory session={session}/>
        </div>
      </div>
      {/* <div className='flex flex-col m-8 rounded-3xl bg-customPrimary'>
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
          </div>
        </div>
      </div> */}

    </div>
  )
}
