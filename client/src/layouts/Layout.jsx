import React from 'react'
import Header from '../shared/components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <main className='flex-1 flex'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout