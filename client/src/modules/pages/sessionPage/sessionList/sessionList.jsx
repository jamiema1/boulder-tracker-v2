import React from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {handleError, sessionEndpoint} from "modules/api/endpoints"

import SessionInfo from "modules/pages/sessionPage/sessionList/sessionInfo"

export default function SessionList() {
  /*
   * React Query Hooks & APIs
   */

  const {
    isLoading: isLoadingSession,
    isError: isErrorSession,
    data: allSessionData,
    error: errorSession,
  } = useQuery(sessionEndpoint, () => axios.get(sessionEndpoint), {
    onError: (error) => handleError(error),
  })

  /*
   * Return value
   */

  if (isLoadingSession) {
    return <div>Loading...</div>
  }

  const filteredSessionData = [...allSessionData.data.data]
    .reverse()
    .sort((session1, session2) =>
      new Date(session1.sessionStartTime) < new Date(session2.sessionStartTime)
        ? 1
        : -1
    )

  if (isErrorSession) {
    return (
      <div>
        Error: {errorSession.message} | {errorSession.response.data.error}
      </div>
    )
  }

  return (

    <div>
      {filteredSessionData.map((session) =>
        <SessionInfo key={session.id} session={session} />
      )}
    </div>
  )
}
