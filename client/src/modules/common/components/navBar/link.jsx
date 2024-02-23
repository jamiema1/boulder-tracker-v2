import React from 'react'

export default function Link({title, path}) {

  return (
    <a href={path} className='text-xl '>{title}</a>
  )
}
