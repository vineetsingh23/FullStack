import React from 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
  return (
    <div className='flex justify-center mx-auto gap-5'>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/about'}>About</NavLink>
        <NavLink to={'/contact'}>Contact Us</NavLink>
        <NavLink to={'/services'}>Our Services</NavLink>
        <NavLink to={'/register'}>Register Here</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/registration'}>Registration</NavLink>
    </div>
  )
}
