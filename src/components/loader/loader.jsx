import React from 'react'
import {GridLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <GridLoader color='oklch(50% 0.134 242.749)' />
    </div>
  )
}
