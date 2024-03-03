import axios from 'modules/api/axios'
import {handleError, sessionEndpoint} from 'modules/api/endpoints'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import SessionHistory from './sessionHistory'

export default function SessionPage() {
  
  const [sessions, setSessions] = useState()

  // return (
  //   <div>
  //     {/* <SessionView session={session} setSession={setSession}/> */}
  //     {/* <div className="flex-grow flex flex-col">
  //       <SessionCalendar setSession={setSession} />
  //     </div>
  //     <div className="flex-grow-[5]">
  //       {session == undefined ?
  //         <SessionNew /> :
  //         <SessionInfo session={session} setSession={setSession}/>
  //       }
  //     </div> */}
  //   </div>
  // )

  const {
    isLoading: isLoadingSession,
    data: allSessionData,
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
      setSessions(filteredSessionData)
    }
  }, [isLoadingSession])
  
  /*
   * Return value
   */

  if (isLoadingSession || sessions == undefined) {
    return <div>Loading...</div>
  }


  return (
    <div className='flex flex-col'>
      <div className='flex h-[100vh]] p-[15px]'>
        <div className='flex-grow-[7] grid grid-rows-2'>
          <div className='grid grid-cols-2'>
            <div className='content flex-grow'>
              <h1>Grade Distribution</h1>
            </div>
            {/* <GradeDistribution session={session} /> */}
            <div className='flex-grow flex flex-col'>
              {/* <Cards session={session} /> */}
              <div className='content flex-grow-[3]'>
                <h1>Timeline</h1>
              </div>
            </div>
          </div>
          <div className='content'>
            <h1>Map</h1>
          </div>
        </div>
        <div className='content flex-grow-[3]'>
          <SessionHistory />
        </div>
      </div>
    </div>
  )
}
