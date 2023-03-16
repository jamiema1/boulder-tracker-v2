import React, {useRef, useImperativeHandle, forwardRef} from 'react'
import Rating from './components/Rating'
import Colour from './components/Colour'
import HoldType from './components/HoldType'
import BoulderType from './components/BoulderType'
import SendAttempts from './components/SendAttempts'
import Description from './components/Description'
import './AddBoulder.css'
import StartDate from './components/StartDate'
import SendDate from './components/SendDate'

const ID_KEY = 'id'
function nextId() {
  const id = JSON.parse(localStorage.getItem(ID_KEY))
  localStorage.setItem(ID_KEY, JSON.stringify(id + 1))
  return id
}

function convertRatingToNumber (str) {
  if (str.includes('hex')) {
    return +str.substring(0, 1)
  }
  return -1
}


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
  
    useImperativeHandle(ref, () => ({
      setOptions(options) {
        setOptions(options)
      }
    }));

    function setOptions([rating, colour, holdType, boulderType, sendAttempts,
      startDate, sendDate, description]) {
      resetDropdownMenus()
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
    }
  



    function resetDropdownMenus () {
    
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

    function handleAddBoulder () {


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
      const description = descriptionRef.current.value

      const anyNullFields = [rating, colour, holdType, boulderType, 
        sendAttempts, startDate, description].reduce((acc, field) => 
        (acc || field === 'null' || field === ''), false)

      if (anyNullFields) {
        alert('Missing required information')
        return
      }

      const newBoulder = { 
        id: nextId(),
        rating: convertRatingToNumber(rating),
        colour: colour,
        holdType: holdType,
        boulderType: boulderType,
        sendAttempts: sendAttempts,
        startDate: startDate,
        sendDate: sendDate,
        description: description
      }

      addBoulderToDB(newBoulder)

      resetDropdownMenus();
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
          <div className='addBoulderButton'>
            <button onClick={handleAddBoulder}
              type="button">Add Boulder</button>
          </div>
        </form>
      </div>
    )
  })