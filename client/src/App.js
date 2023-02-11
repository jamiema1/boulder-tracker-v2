import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import BoulderList from './BoulderList';
import {v4 as uuidv4} from 'uuid'

function App() {

  // const [rating, setRating] = useState(0)
  // const [colour, setColour] = useState('')
  // const [type, setType] = useState('')
  const [boulderList, setBoulderList] = useState([])
  const ratingRef = useRef(); 
  const colourRef = useRef();
  const typeRef = useRef(); 
  const descriptionRef = useRef();

  useEffect(() => {

  }, [boulderList])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setBoulderList(response.data)
      })
  }, [])

  function handleAddBoulder() {

    const rating = ratingRef.current.value
    const colour = colourRef.current.value
    const type = typeRef.current.value
    const description = descriptionRef.current.value

    if (rating === null || colour === null || type === null) return

    Axios.post('http://localhost:3001/api/insert', { rating: rating, colour: colour, type: type, description: description})
      .catch(() => {
        alert('Failed Insert')
      })
    
    setBoulderList([...boulderList, { id: uuidv4(), rating: rating, colour: colour, type: type, description: description}])
 
    ratingRef.current.value = null
    colourRef.current.value = null
    typeRef.current.value = null
    descriptionRef.current.value = null
  }

  return (
    <>
      <div>Boulder Tracker</div>
      <div>Rating</div>
      <input ref={ratingRef} type="number"/>
      <div>Colour</div>
      <input ref={colourRef} type="text"/>
      <div>Type</div>
      <input ref={typeRef} type="text"/>
      <div>Description</div>
      <input ref={descriptionRef} type="text"/>
      <button onClick={handleAddBoulder}>Submit</button>
      {/* <button onClick={handleDeleteBoulder}>Delete</button> */}

      <BoulderList boulderList={boulderList} />
      
    </> 
  );
}

export default App;
