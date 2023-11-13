/* eslint-disable max-len */
import React, {useRef} from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Accordion from "react-bootstrap/Accordion"
import {useMutation, useQuery, useQueryClient} from "react-query"
import {sessionEndpoint} from "api/endpoints.js"
import axios from "api/axios"
import SessionGymIdInput from "modules/pages/sessionPage/components/sessionAddForm/components/sessionGymIdInput"
import SessionUserIdInput from "modules/pages/sessionPage/components/sessionAddForm/components/sessionUserIdInput"
import SessionStartTimeInput from "./components/sessionStartTimeInput"
import SessionEndTimeInput from "./components/sessionEndTimeInput"
import AddingButtonStack from "modules/common/components/addingButtonStack"
import {
  convertToEditDateTime,
  getCurrentDateTime,
} from "modules/common/helpers.js"

export default function SessionAddForm({resetDefaultView}) {
  const gymIdRef = useRef(0)
  const userIdRef = useRef(0)
  const sessionStartTimeRef = useRef("")
  const sessionEndTimeRef = useRef("")

  const queryClient = useQueryClient()

  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint)
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
        clearSessionRefs()
      },
    }
  )

  /*
   * Helper Functions
   */

  function clearSessionRefs() {
    gymIdRef.current.value = 0
    userIdRef.current.value = 0
    sessionStartTimeRef.current.value = ""
    sessionEndTimeRef.current.value = ""
    resetDefaultView()
  }

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
    <Accordion.Item eventKey={0} className="mb-3">
      <Accordion.Header>
        <Form>
          <Row>
            <Col xl>
              <SessionGymIdInput ref={gymIdRef}></SessionGymIdInput>
            </Col>
            <Col xl>
              <SessionUserIdInput
                defaultValue={1}
                ref={userIdRef}
              ></SessionUserIdInput>
            </Col>
            <Col xl>
              <SessionStartTimeInput
                defaultValue={convertToEditDateTime(getCurrentDateTime())}
                ref={sessionStartTimeRef}
              ></SessionStartTimeInput>
            </Col>
            <Col xl>
              <SessionEndTimeInput
                ref={sessionEndTimeRef}
              ></SessionEndTimeInput>
            </Col>
            <Col xl>
              <AddingButtonStack
                add={() => addSession.mutate(getNewSession())}
                clearRefs={() => clearSessionRefs()}
              ></AddingButtonStack>
            </Col>
          </Row>
        </Form>
      </Accordion.Header>
    </Accordion.Item>
  )
}
