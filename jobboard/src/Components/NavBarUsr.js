import React from 'react'
import { Link } from 'react-router-dom'

function NavBarUsr(props) {
  const userInfo = props.props
  return (
    <div className='testclass'>
      <h4 className='siteLogo'><Link to='/'>Placeholder Site Title</Link></h4>
      <Link to='/'>Home</Link>
      <Link to='/Profile'>Profile</Link>
      <Link to='/CreatePost'>Create a new Post !</Link>
      <Link to={`/MyComments/${userInfo._id}`}>My job Applications</Link>
      <Link to={`/MyOffers/${userInfo._id}`}>My job Offers</Link>
      <img className="Profile_Pic" src={userInfo.preview_profileImage} alt="profileImage" />
      <Link to='/FormLogin' state={"logout"}>Log out</Link>
    </div>
  )
}

export default NavBarUsr