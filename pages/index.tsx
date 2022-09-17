import type { NextPage } from 'next'
import React from 'react'
import TestList from './components/views/TestList'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen  bg-[#263238] overflow-hidden flex justify-center"><TestList></TestList></div>
  )
}

export default Home
