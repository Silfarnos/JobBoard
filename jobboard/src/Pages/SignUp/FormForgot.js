import axios from 'axios';
import React, { useState } from 'react'
import NavBar from '../../Components/Navbar';

function FormForgot(props) {
  const [email, setEmail] = useState()

  function handleChange(e) {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post('http://localhost:3000/api/verify/sendresetpasswordemail', { email: email })
    alert(res.data.message)
  }
  return (
    <div>
      <NavBar />
      <div className='ProfileContainer'>
        <div className='ProfileInfo'>
          <h3>FormForgot</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label id='email'>Your Email</label><br />
            <input type='email' name='email' onChange={(e) => handleChange(e)} />
            <button type='submit'>Reset your password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormForgot