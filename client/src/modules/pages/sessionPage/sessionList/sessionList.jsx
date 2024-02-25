import React from "react"

import {useQuery} from "react-query"
// import {useMutation, useQuery, useQueryClient} from "react-query"

import axios from "modules/api/axios"
import {handleError, sessionEndpoint} from "modules/api/endpoints"

// import {currentDateTime} from "modules/common/helpers"
// import DeleteButtonModal
//  from "modules/common/components/buttons/deleteButtonModal"
// import EditButtonModal 
// from "modules/common/components/buttons/editButtonModal"
// import EndButtonModal from "modules/common/components/buttons/endButtonModal"

// import ClimbList from "modules/pages/sessionPage/climbList/climbList"
// import SessionEditForm 
// from "modules/pages/sessionPage/sessionList/components/sessionEditForm"
import SessionRecents from "modules/pages/sessionPage/sessionList/sessionRecents"
// import {nullDateTime} from "modules/common/constants"

export default function SessionList() {
  /*
   * React Query Hooks & APIs
   */

  // const queryClient = useQueryClient()

  const {
    isLoading: isLoadingSession,
    isError: isErrorSession,
    data: allSessionData,
    error: errorSession,
  } = useQuery(sessionEndpoint, () => axios.get(sessionEndpoint), {
    onError: (error) => handleError(error),
  })

  // const editSession = useMutation(
  //   ({sessionId, newSession}) =>
  //     axios.put(sessionEndpoint + "/" + sessionId, newSession),
  //   {
  //     onSuccess: (data, {sessionId, newSession}) => {
  //       queryClient.setQueryData(sessionEndpoint, {
  //         data: {
  //           data: [...allSessionData.data.data].map((session) => {
  //             return session.id === sessionId
  //               ? {id: sessionId, ...newSession}
  //               : session
  //           }),
  //         },
  //       })
  //     },
  //     onError: (error) => handleError(error),
  //   }
  // )

  // const deleteSession = useMutation(
  //   (sessionId) => axios.delete(sessionEndpoint + "/" + sessionId),
  //   {
  //     onSuccess: (data, sessionId) => {
  //       queryClient.setQueryData(sessionEndpoint, {
  //         data: {
  //           data: [...allSessionData.data.data].filter((session) => {
  //             return session.id !== sessionId
  //           }),
  //         },
  //       })
  //     },
  //     onError: (error) => handleError(error),
  //   }
  // )

  /*
   * Helper functions
   */

  // function endSession(session) {
  //   editSession.mutate({
  //     sessionId: session.id,
  //     newSession: {
  //       gymId: parseInt(session.gymId),
  //       userId: parseInt(session.userId),
  //       sessionStartTime: session.sessionStartTime,
  //       sessionEndTime: currentDateTime(),
  //     },
  //   })
  // }

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
    <div className='flex flex-col m-8 rounded-3xl bg-customPrimary'>
      <h1>Recent Sessions</h1>
      <div className="flex flex-col h-[28vh] overflow-y-auto">
        {filteredSessionData.map((session) => {
          return (
            <SessionRecents key={session.id} session={session} />
          /* <Accordion.Body className="px-2">
                <Stack direction="horizontal" gap={3}>
                  {session.sessionEndTime === nullDateTime && (
                    <EndButtonModal
                      confirmAction={() => endSession(session)}
                      title={"End Session"}
                      description={"Done already?"}
                    ></EndButtonModal>
                  )}
                  <EditButtonModal
                    title={"Edit Session"}
                    form={
                      <SessionEditForm session={session}></SessionEditForm>
                    }
                  ></EditButtonModal>
                  <DeleteButtonModal
                    confirmAction={() => deleteSession.mutate(session.id)}
                    title={"Delete Session"}
                  ></DeleteButtonModal>
                </Stack>
                <ClimbList session={session}></ClimbList>
              </Accordion.Body> */
          )
        })}
      </div>
    </div>
  )
}
