import React, {useState} from "react"
import SessionView from "./sessionView/sessionView"


export default function SessionPage() {
  
  const [session, setSession] = useState()

  return (
    <div>
      <SessionView session={session} setSession={setSession}/>
      {/* <div className="flex-grow flex flex-col">
        <SessionCalendar setSession={setSession} />
      </div>
      <div className="flex-grow-[5]">
        {session == undefined ?
          <SessionNew /> :
          <SessionInfo session={session} setSession={setSession}/>
        }
      </div> */}
    </div>
  )
}
