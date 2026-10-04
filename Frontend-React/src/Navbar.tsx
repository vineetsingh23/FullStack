
import { NavLink } from 'react-router'

export default function Navbar() {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
     isActive ? 'text-red-500 font-bold border-b-3 border-red-500' : 'text-black'
  // isActive ? "text-red-500 font-bold" : "text-black"; 

  
  return (
    <div className='flex justify-center mx-auto gap-5 py-4 bg-accent active:text-primary '>
        <NavLink to={'/'} className={getNavClass}>Home</NavLink>
        <NavLink to={'/about'}  className={getNavClass}>About</NavLink>
        <NavLink to={'/contact'}  className={getNavClass}>Contact Us</NavLink>
        <NavLink to={'/services'}  className={getNavClass}>Our Services</NavLink>
        <NavLink to={'/employee-data'}  className={getNavClass}>Employees Data</NavLink>
        <NavLink to={'/login'}  className={getNavClass}>Login</NavLink>
        <NavLink to={'/registration'}  className={getNavClass}>Registration</NavLink>
        <NavLink to={'/profile'}  className={getNavClass}>User Profile</NavLink>
    </div>
  )
}
