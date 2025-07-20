import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'

function NavBar() {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-6 shadow-md">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 object-contain"
        />
      </Link>

      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default NavBar
