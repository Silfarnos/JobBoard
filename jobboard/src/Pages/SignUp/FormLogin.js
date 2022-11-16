import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useForm from '../../Components/useForm';
import NavBar from '../../Components/Navbar';




function FormLogin() {
  const location = useLocation()
  const logout = location.state
  const navigate = useNavigate();
  const { handleChange, values } = useForm();

  if (logout==='logout') {
    localStorage.removeItem('user')
  }
  
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
    if (res.data.user.level >= 1) {
      navigate ('/BackOffice')
    } else {
      navigate('/')
    };
  }
  return (
    <div>
      <NavBar />
    <div className='ProfileContainer'>
      <div className='ProfileInfo'>
        <h3>Log In!</h3>
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

export default FormLogin