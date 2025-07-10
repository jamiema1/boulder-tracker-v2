import React from "react"

export default function Button({text, isSuccess, onClick}) {

  const buttonColour = isSuccess ? "bg-customSuccess" : "bg-customFailure"

  return (
    <button
      className={`p-2 ${buttonColour} rounded-3xl drop-shadow-md
            scale-95 hover:scale-100 hover:cursor-pointer
            transition duration-700 ease-out`}
      onClick={() => onClick()}>
      {text}
    </button>
  )
}
