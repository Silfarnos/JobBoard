import React, { useState } from 'react'
import AdminGetUsers from './AdminGetUsers';
import AdminGetComments from './AdminGetComments';
import AdminGetOffers from './AdminGetOffers';
import axios from 'axios';


function BackOfficeYes(props) {
  const [display, setDisplay] = useState('offers')
  const user = props.user
  const [email, setEmail] = useState('')
  const [level, setLevel] = useState(0)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let grantAdmin = await axios.put(`http://localhost:3000/api/auth/admin`, { email: email, level: level }, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
    alert(grantAdmin.data.message)
  }
  return (
    <div>Welcome to the back office!
      {user.level == 2 && <div><input type="text" placeholder=" Enter an Email to grant it admin permission" onChange={(e) => handleChange(e)} />
        <select className= 'browser-default'name="level" id="level" onChange={(e) => setLevel(e.target.value)}>
          <option value="0">User</option>
          <option value="1">Admin</option>
          <option value="2">Super Admin</option>
        </select>
        <button onClick={handleSubmit} className="pointer">Edit permission</button></div>}


      <select className='browser-default' onChange={(e) => setDisplay(e.target.value)}>
        <option value='offers'>Offers</option>
        <option value='users'>Users</option>
        <option value='comments'>Comments</option>
      </select>
      {display === 'users' && <AdminGetUsers user={user} />}
      {display === 'comments' && <AdminGetComments user={user} />}
      {display === 'offers' && <AdminGetOffers user={user} />}
    </div>
  )
}

export default BackOfficeYes