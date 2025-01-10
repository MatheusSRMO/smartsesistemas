import Loader from '@/components/loader'
import React from 'react'

export default function Loading() {
  return (
    <div className='container flex justify-center items-center h-screen'>
      <Loader />
    </div>
  )
}
