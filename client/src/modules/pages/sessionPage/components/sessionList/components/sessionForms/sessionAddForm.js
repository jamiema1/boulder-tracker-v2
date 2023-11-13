import React, {useRef} from "react"
import Form from "react-bootstrap/Form"
import {useMutation, useQuery, useQueryClient} from "react-query"
import {handleError, sessionEndpoint} from "modules/api/endpoints.js"
import axios from "modules/api/axios"
import SessionGymIdInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionGymIdInput"
import SessionUserIdInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionUserIdInput"
import SessionStartTimeInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionStartTimeInput"
import SessionEndTimeInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionEndTimeInput"
import AddingButtonStack from "modules/common/components/addingButtonStack"
import {
  convertToEditDateTime,
  getCurrentDateTime,
} from "modules/common/helpers.js"

export default function SessionAddForm({handleClose}) {
  const gymIdRef = useRef(0)
  const userIdRef = useRef(0)
  const sessionStartTimeRef = useRef("")
  const sessionEndTimeRef = useRef("")

  const queryClient = useQueryClient()

  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const addSession = useMutation(
    (newSession) => axios.post(sessionEndpoint, newSession),
    {
      onSuccess: (data, newSession) => {
        queryClient.setQueryData(sessionEndpoint, {
          data: {
            data: [
              ...allSessionData.data.data,
              {id: data.data.data[0].id, ...newSession},
            ],
          },
        })
      },

      onError: (error) => handleError(error),
    }
  )

  /*
   * Helper Functions
   */

  function getNewSession() {
    return {
      gymId: parseInt(gymIdRef.current.value),
      userId: parseInt(userIdRef.current.value),
      sessionStartTime: sessionStartTimeRef.current.value,
      sessionEndTime:
        sessionEndTimeRef.current.value === ""
          ? "0000-00-00 00:00:00"
          : sessionEndTimeRef.current.value,
    }
  }

  /*
   * Return Value
   */

  if (isLoadingSession) {
    return <div>Loading...</div>
  }

  return (
    <Form>
      <SessionGymIdInput ref={gymIdRef}></SessionGymIdInput>
      <SessionUserIdInput defaultValue={1} ref={userIdRef}></SessionUserIdInput>
      <SessionStartTimeInput
        defaultValue={convertToEditDateTime(getCurrentDateTime())}
        ref={sessionStartTimeRef}
      ></SessionStartTimeInput>
      <SessionEndTimeInput ref={sessionEndTimeRef}></SessionEndTimeInput>
      <AddingButtonStack
        confirm={() => {
          handleClose()
          addSession.mutate(getNewSession())
        }}
        cancel={() => {
          handleClose()
        }}
      ></AddingButtonStack>
    </Form>
  )
}
