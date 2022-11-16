import React from 'react'
import { Link } from 'react-router-dom'

function NavBarGuest() {
  return (
    <div className='testclass'>
      <h4 className='siteLogo'><Link to='/'>Placeholder Site Title</Link></h4>
      <Link to='/'>Home</Link>
      <Link to='/FormLogin' state={"login"}>LogIn</Link>
      <Link to='/SignUp'>Signup</Link>
    </div>
  )
}

export default NavBarGuest