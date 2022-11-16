// import axios from 'axios'
import React from 'react'
import NavBar from '../../Components/Navbar'
import EditProfileForm from './EditProfileForm'
import NotLoggedIn from './NotLoggedIn'

function EditProfile() {
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
      {display === 'true' && <EditProfileForm />}

    </div>
  )
}

export default EditProfile