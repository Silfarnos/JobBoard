import React from 'react'
import NavBar from '../../Components/Navbar'
import NotLoggedIn from '../Profile/NotLoggedIn'
import EditComment from './editComment'


function EditCommentCheck() {
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
      {display === 'true' && <EditComment />}
    </div>
  )
}

export default EditCommentCheck