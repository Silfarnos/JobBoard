import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Navbar';
import BackOfficeYes from './BackOfficeYes';
import NotAnAdmin from './NotAnAdmin';


function BackOffice() {
  document.title = 'Where all tables go to drop';
  const [display, setDisplay] = useState(false)
  const [user, setUser] = useState({})
  async function fetchUserInfo(data) {
    if (data == null) return
    try {
      const info = await axios.get(`http://localhost:3000/api/auth/${data.userId}`, {
        headers: {
          authorization: `Bearer ${data.token}`
        }
      })
      if (info.data.level >= 1) {
        setDisplay(true)
        setUser(info.data)
      } else {
        setDisplay(false)
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      setDisplay(false)
    } else {
      fetchUserInfo(JSON.parse(localStorage.getItem('user')))
    }
  }, []);
  return (
    <div>
      <NavBar />
      {display ? <BackOfficeYes user={user} /> : <NotAnAdmin />}
    </div>
  )
}

export default BackOffice