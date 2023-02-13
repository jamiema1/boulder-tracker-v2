import React from 'react'
import Boulder from './Boulder'

export default function BoulderList({boulderList}) {
  return (
    boulderList.map((boulder) => {
        return <Boulder key={boulder.id} boulder={boulder} />
    })
  )
}
