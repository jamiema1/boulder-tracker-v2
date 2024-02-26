import React, {useState} from "react"

import SessionCalendar from "modules/pages/sessionPage/components/sessionCalendar"
import SessionInfo from "modules/pages/sessionPage/components/sessionInfo"
import SessionNew from "modules/pages/sessionPage/components/sessionNew"
// import SessionList from "modules/pages/sessionPage/sessionList/sessionList"

export default function SessionPage() {
  
  const [session, setSession] = useState()

  return (
    <div className="flex">
      <div className="flex-grow flex flex-col">
        <SessionCalendar setSession={setSession} />
        {/* <SessionList /> */}
      </div>
      <div className="flex-grow-[5]">
        {session == undefined ?
          <SessionNew /> :
          <SessionInfo session={session} setSession={setSession}/>
        }
      </div>
    </div>
  )
}
