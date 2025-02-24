import React from 'react'
import Weather from './components/Weather'
import { Header } from './components/Header'
import { Footer } from './components/Footer'


const App = () => {
  return (
    <div className='app'>
      <Header/>
      <Weather/>
      <Footer/>
    </div>
  )
}

export default App

