import React from 'react'
import Container from './Container'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex items-center min-h-16 bg-white'>

            <Container className="flex items-center justify-between">
                <NavLink to="/" className='font-cursive text-3xl hover:text-shadow-[0px_0px_12px_#4d169a4d] transition-all duration-200 text-violet-900 cursor-pointer'>urlify</NavLink>
                <div>
                    <NavLink to="/healthz" className='bg-black hover:bg-violet-700/80 text-white py-2 px-6  rounded-full cursor-pointer font-semibold outline-none '>Health Check</NavLink>
                </div>
            </Container>
            
        </div>
    )
}

export default Header