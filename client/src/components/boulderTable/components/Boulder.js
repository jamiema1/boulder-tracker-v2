import React from 'react'

export default function Boulder ({boulder, deleteBoulderFromDB, setOptions}) {
  function getDate (datetime) {
    if (datetime === null || datetime === undefined) {
      return 'Unfinished'
    }
    return datetime.toString().split('T')[0]
  }

  function handleDeleteBoulder (e) {
    deleteBoulderFromDB(e.target.id)
  }

  function handleUpdateBoulder(e) {
    const row = e.target.parentElement.parentElement.parentElement
    const tds = row.getElementsByTagName('td')

    if (tds.length < 10) {
      alert('All columns must be shown before editing a boulder')
      return
    }

    let rating = tds[1].childNodes[0].data
    const colour = tds[2].childNodes[0].data
    const holdType = tds[3].childNodes[0].data
    const boulderType = tds[4].childNodes[0].data
    const sendAttempts = tds[5].childNodes[0].data
    const startDate = tds[6].childNodes[0].data
    let sendDate = tds[7].childNodes[0].data
    const description = tds[8].childNodes[0].data 

    rating = rating === '-1' ? "unrated" : rating + " hex"
    sendDate = sendDate === "Unfinished" ? null : sendDate

    setOptions(
      [rating, colour, holdType, boulderType, sendAttempts, startDate, 
        sendDate, description])


    // TODO: update boulders in DB
    // Axios.put('http://localhost:3001/api/update', updatedBoulder)
    //   .then(() => {
    //     updateBoulderList();
    //     alert('Successful Update')
    //   })
    //   .catch(() => {
    //     alert('Failed Update')
    //   })
  }
  
  return (
    <tr>
      <td>
        <button onClick={ handleDeleteBoulder } type="button" id={boulder.id}>
          <img id={boulder.id} src="./images/delete.png"></img>
        </button>
      </td>
      {boulder.rating !== undefined && <td>{boulder.rating}</td>}
      {boulder.colour !== undefined && <td>{boulder.colour}</td>}
      {boulder.holdType !== undefined && <td>{boulder.holdType}</td>}
      {boulder.boulderType !== undefined && <td>{boulder.boulderType}</td>}
      {boulder.sendAttempts !== undefined && <td>{boulder.sendAttempts}</td>}
      {boulder.sendStatus !== undefined && <td>{boulder.sendStatus}</td>}
      {boulder.startDate !== undefined && <td>{getDate(boulder.startDate)}</td>}
      {boulder.sendDate !== undefined && <td>{getDate(boulder.sendDate)}</td>}
      {boulder.description !== undefined && <td>{boulder.description}</td>}
      <td>
        <button onClick={ handleUpdateBoulder } type="button" id={boulder.id}>
          <img id={boulder.id} src="./images/edit.png">
          </img>
        </button>
      </td>
    </tr>
  )
}
