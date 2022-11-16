import React from 'react'
import NavBar from '../../Components/Navbar';
import NotLoggedIn from './NotLoggedIn';
import ProfileYes from './ProfileYes';

function Profile() {
  document.title = 'Your Profile!';
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
      {display === 'true' && <ProfileYes />}

    </div>
  )
}

export default Profile