import React, {useRef, useState, useImperativeHandle, forwardRef} from 'react'
import Rating from './components/Rating'
import Colour from './components/Colour'
import HoldType from './components/HoldType'
import BoulderType from './components/BoulderType'
import SendAttempts from './components/SendAttempts'
import Description from './components/Description'
import './AddBoulder.css'
import StartDate from './components/StartDate'
import SendDate from './components/SendDate'

function convertRatingToNumber (str) {
  if (str.includes('hex')) {
    return +str.substring(0, 1)
  }
  return -1
}

let updateBoulderId


export default forwardRef(
  function AddBoulder (props, ref) {

    const ratingRef = useRef()
    const colourRef = useRef()
    const holdTypeRef = useRef()
    const boulderTypeRef = useRef()
    const sendAttemptsRef = useRef()
    const startDateRef = useRef()
    const sendDateRef = useRef()
    const descriptionRef = useRef() 

    const addBoulderToDB = props.addBoulderToDB
    const updateBoulderFromDB = props.updateBoulderFromDB
  
    useImperativeHandle(ref, () => ({
      setOptions(options) {
        setOptions(options)
      }
    }));

    function resetInputFields () {
    
      function resetOption(option) {
        option.selected = option.defaultSelected
      }
  
      Array.from(ratingRef.current.options).forEach(resetOption)
      Array.from(colourRef.current.options).forEach(resetOption)
      Array.from(holdTypeRef.current.children)
        .filter(e => e.nodeName === 'INPUT').forEach(e => e.checked = false)
      Array.from(boulderTypeRef.current.options).forEach(resetOption)
      Array.from(sendAttemptsRef.current.options).forEach(resetOption)
      startDateRef.current.value = null
      sendDateRef.current.value = null
      descriptionRef.current.value = null
    }

    function getInputFields() {
      const rating = ratingRef.current.selectedOptions[0].value
      const colour = colourRef.current.selectedOptions[0].value
      const holdType = Array.from(holdTypeRef.current.children)
        .filter(e => e.nodeName === 'INPUT' && e.checked)
        .reduce((acc, field) => (acc.concat(field.value, ' ')), '').trimEnd()
      const boulderType = boulderTypeRef.current.selectedOptions[0].value
      const sendAttempts = sendAttemptsRef.current.selectedOptions[0].value
      const startDate = startDateRef.current.value
      const sendDate = sendDateRef.current.value === '' ? null :
        sendDateRef.current.value
      const description = descriptionRef.current.value.replace('\'', '\\\'')
      // TODO: may need to be generalized to other special characters as well


      const anyNullFields = [rating, colour, holdType, boulderType, 
        sendAttempts, startDate, description].reduce((acc, field) => 
        (acc || field === 'null' || field === ''), false)

      if (anyNullFields) {
        alert('Missing required information')
        return
      }

      const boulder = {
        rating: convertRatingToNumber(rating),
        colour: colour,
        holdType: holdType,
        boulderType: boulderType,
        sendAttempts: sendAttempts,
        startDate: startDate,
        sendDate: sendDate,
        description: description
      }
      return boulder
    }

    function addBoulder () {

      let newBoulder = getInputFields()
      if (newBoulder === undefined) return
      addBoulderToDB(newBoulder)
      resetInputFields()
    }
    
    const [updating, setUpdating] = useState(false)


    function setOptions([id, rating, colour, holdType, boulderType, 
      sendAttempts, startDate, sendDate, description]) {
      resetInputFields()
      function setOption(option, value) {
        if (option.value === value) {
          option.selected = 'selected'
        }
      }
      Array.from(ratingRef.current.options)
        .forEach(option => setOption(option, rating))
      Array.from(colourRef.current.options)
        .forEach(option => setOption(option, colour))
      Array.from(holdTypeRef.current.children)
        .filter(e => e.nodeName === 'INPUT').forEach(e => {
          if (holdType.includes(e.value)) {
            e.checked = true
          } else {
            e.check = false
          }
        })
      Array.from(boulderTypeRef.current.options)
        .forEach(option => setOption(option, boulderType))
      Array.from(sendAttemptsRef.current.options)
        .forEach(option => setOption(option, sendAttempts))
      startDateRef.current.value = startDate
      sendDateRef.current.value = sendDate
      descriptionRef.current.value = description
      
      // TODO: move to a separate function
      updateBoulderId = id
      setUpdating(true)
    }

    function updateBoulder() {

      const updatedBoulder = getInputFields()
      if (updatedBoulder === undefined) return
      updatedBoulder.id = updateBoulderId
      updateBoulderFromDB(updatedBoulder)
      resetInputFields()
      setUpdating(false)
    }

    function cancelUpdate() {
      resetInputFields()
      setUpdating(false)
    }

    return (
      <div className='addBoulder'>
        <div className='componentTitle'>Add Boulder</div>
        <form id="addBoulderForm">
          <div className="dropDownOptionsWrapper">
            <div className="dropDownOptions">
              <Rating ref={ ratingRef }/>
              <Colour ref={ colourRef }/>
              <BoulderType ref={ boulderTypeRef }/>
              <SendAttempts ref={ sendAttemptsRef }/>
              <StartDate ref={ startDateRef }/>
              <SendDate ref={ sendDateRef }/>
            </div>
            <div></div>
          </div>
          <HoldType ref={ holdTypeRef }/>
          <Description ref={ descriptionRef }/>
          <div className='addBoulderButtons'>
            <div className='clearFieldsButton'>
              <button type="button" onClick={resetInputFields}>
                Clear Fields</button>
            </div>
            <div className='cancelUpdateButton'>
              <button type="button" onClick={cancelUpdate} disabled={!updating}>
                Cancel Update</button>
            </div>
            <div className='updateBoulderButton'>
              <button type="button" onClick={updateBoulder} 
                disabled={!updating}>Update Boulder</button>
            </div>
            <div className='addBoulderButton'>
              <button onClick={addBoulder} type="button" disabled={updating}>
                Add Boulder</button>
            </div>
          </div>
        </form>
      </div>
    )
  })