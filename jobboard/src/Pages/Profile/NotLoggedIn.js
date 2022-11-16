import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import useForm from '../../Components/useForm';

function NotLoggedIn() {
  const { handleChange, values } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null
    try {
      res = await axios.post('http://localhost:3000/api/auth/login', { email: values.email, password: values.password })
    } catch {
      alert('error during login')
    }
    let user = {
      name: res.data.user.name,
      lastname: res.data.user.lastname,
      email: res.data.user.email,
      phone: res.data.user.phone,
      userId: res.data.user.userId,
      pseudo: res.data.user.pseudo,
      level: res.data.user.level,
      emailVerified: res.data.user.emailVerified || 'false',
      token: res.data.user.token
    }
    localStorage.setItem("user", JSON.stringify(user))
    window.location.reload(false);
  }
  return (
    <div>You need to be logged in to access this page
      <div>
        <div className='ProfileInfo'>
          <h3>Sign IN!</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label id='email'>Your Email</label>
            <input type='email' name='email' value={values.email} onChange={handleChange} />
            <label id='password'>Your Password</label>
            <input type='password' name='password' value={values.password} onChange={handleChange} />
            <button type='submit'>Log In!</button>
          </form>
          <div>Forgot your password ? Reset it <Link to={'/FormForgot'}>Here!</Link></div>
          <div>Don't have an account? Sign up <Link to={'/SignUp'}>Here!</Link></div>
        </div>
      </div>
    </div>
  )
}

export default NotLoggedIn