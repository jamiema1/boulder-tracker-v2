import React from 'react'

export default function Card({data, title}) {
  return (
    <div className='content flex-grow flex flex-col 
    items-center justify-around px-0'>
      <div className='font-semibold text-4xl'>{data}</div>
      <div className='font-medium text-2xl'>{title}</div>
    </div>
  )
}
