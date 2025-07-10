import React from "react"

import {useQuery} from "react-query"
// import {useMutation, useQuery, useQueryClient} from "react-query"

import axios from "modules/api/axios"
import {climbEndpoint, handleError} from "modules/api/endpoints"

// import DeleteButtonModal 
// from "modules/common/components/buttons/deleteButtonModal"
// import EditButtonModal 
// from "modules/common/components/buttons/editButtonModal"

// import ClimbEditForm 
// from "modules/pages/sessionPage/climbList/components/climbEditForm"
import ClimbInfo from "modules/pages/sessionPage/components/climbsList/components/climbInfo"

export default function ClimbList({session}) {
  /*
   * React Query Hooks & APIs
   */

  // const queryClient = useQueryClient()

  const {
    isLoading: isLoadingClimb,
    isError: isErrorClimb,
    data: allClimbData,
    error: errorClimb,
  } = useQuery(climbEndpoint, () => axios.get(climbEndpoint), {
    onError: (error) => handleError(error),
  })

  // const deleteClimb = useMutation(
  //   (climbId) => axios.delete(climbEndpoint + "/" + climbId),
  //   {
  //     onSuccess: (data, climbId) => {
  //       queryClient.setQueryData(climbEndpoint, {
  //         data: {
  //           data: [...allClimbData.data.data].filter((climb) => {
  //             return climb.id !== climbId
  //           }),
  //         },
  //       })
  //     },
  //     onError: (error) => handleError(error),
  //   }
  // )

  /*
   * Return value
   */

  if (isLoadingClimb) {
    return <div>Loading...</div>
  }

  if (isErrorClimb) {
    return (
      <div>
        Error: {errorClimb.message} | {errorClimb.response.data.error}
      </div>
    )
  }

  const filteredClimbData = [...allClimbData.data.data]
    .filter((climb) => climb.sessionId === session.id)
    .reverse()

  return (
    <div>
      {filteredClimbData.map((climb) => {
        return (
          <ClimbInfo key={climb.id} climb={climb}></ClimbInfo>
        // <Accordion.Item
        //   eventKey={climb.id}
        //   key={climb.id}
        //   className="mb-3"
        // >
        //   <Accordion.Header>
        //     <ClimbInfo climb={climb}></ClimbInfo>
        //   </Accordion.Header>
        //   <Accordion.Body>
        //     <Stack direction="horizontal" gap={3}>
        //       <EditButtonModal
        //         title={"Edit Climb"}
        //         form={
        //           <ClimbEditForm
        //             climb={climb}
        //             session={session}
        //           ></ClimbEditForm>
        //         }
        //       ></EditButtonModal>
        //       <DeleteButtonModal
        //         confirmAction={() => deleteClimb.mutate(climb.id)}
        //         title={"Delete Climb"}
        //       ></DeleteButtonModal>
        //     </Stack>
        //   </Accordion.Body>
        // </Accordion.Item>
        )
      })}
    </div>
  )
}
