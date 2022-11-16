import React from 'react'
import NavBar from '../../Components/Navbar'
import NotLoggedIn from '../Profile/NotLoggedIn'
import EditPost from './editPost'

function EditPostCheck() {
  var display = 'false'
  if (!localStorage.getItem('user')) {
    display = 'false'
  } else {
    display = 'true'
  }
  return (
    <div>
      <NavBar />
      {display === 'false' && <NotLoggedIn />}
      {display === 'true' && <EditPost />}
    </div>
  )
}

export default EditPostCheck