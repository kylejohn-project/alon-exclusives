import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2">
        <Link to="/" className='hover:text-orange-300'>Dashboard</Link>
        <Link to="/orders" className='hover:text-orange-300'>Orders</Link>
        <Link to="/expenses" className='hover:text-orange-300'>Expenses</Link>
        <Link to="/inventory" className='hover:text-orange-300'>Inventory</Link>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Alon Exclusives</a>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-md gap-5">
      <Link to="/" className='hover:text-orange-300'>Dashboard</Link>
      <Link to="/orders" className='hover:text-orange-300'>Orders</Link>
      <Link to="/expenses" className='hover:text-orange-300'>Expenses</Link>
      <Link to="/inventory" className='hover:text-orange-300'>Inventory</Link>
    </ul>
  </div>
</div>
  )
}

export default NavBar
