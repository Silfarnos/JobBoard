import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Navbar'
import NotLoggedIn from '../Profile/NotLoggedIn'
import CreatePost from './CreatePost'
import EmailNotVerified from './EmailNotVerified'

function CreatePostCheck() {

  const [display, setDisplay] = useState('false')

  async function fetchUserInfo(data) {
    if (data == null) return
    try {
      const info = await axios.get(`http://localhost:3000/api/auth/${data.userId}`, {
        headers: {
          authorization: `Bearer ${data.token}`
        }
      })
      if (info.data.emailVerified === true) {
        setDisplay('verif')
      }
      else {
        setDisplay('notverif')
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!localStorage.getItem('user')) {
    display = 'false'
  } else {
    fetchUserInfo(JSON.parse(localStorage.getItem('user')))
  }

  return (
    <div>
      <NavBar />
      {display === 'false' && <NotLoggedIn />}
      {display === 'notverif' && <EmailNotVerified />}
      {display === 'verif' && <CreatePost />}
    </div>
  )
}

export default CreatePostCheck