import React from 'react'

export default function HoldType() {
  return (
    <> 
        <label for="holdType">Hold Type: </label>
        <select name="holdType" id="holdType" multiple>
            <option value="null">-- Choose Hold Type --</option>
            <option value="jug">Jug</option>
            <option value="mini-jug">Mini-Jug/Incut</option>
            <option value="edge">Edge/Rail</option>
            <option value="crimp">Crimp</option>
            <option value="sloper">Sloper</option>
            <option value="pocket">Pocket</option>
            <option value="pinch">Pinch</option>
            <option value="undercling">Undercling</option>
            <option value="side pull">Side Pull</option>
            <option value="gaston">Gaston</option>
            <option value="flake">Flake</option>
            <option value="horn">Horn</option>
            <option value="volume">Volume</option>
        </select>
    </> 
  )
}
