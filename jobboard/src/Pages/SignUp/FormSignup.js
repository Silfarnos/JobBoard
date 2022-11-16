import React, { useState } from 'react'
import axios from 'axios';
import useForm from '../../Components/useForm';
import validate from '../../Components/validateInfo';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../Components/Navbar';

function FormSignup() {
  const { handleChange, values } = useForm()
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null
    try {
      res = await axios.post('http://localhost:3000/api/auth/signup', { email: values.email, password: values.password, phone: values.phone, lastname: values.lastname, name: values.name, pseudo: values.pseudo })
      alert(res.data.message)
    } catch {
      alert('error during signup')
    }
    if (res) {
      navigate('/FormLogin')
    }

  }

  return (
    <div>
      <NavBar />
      <div className='ProfileContainer'>
        <div className='ProfileInfo'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label id='email'>Your Email</label>
            <input
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}

            <label id='password'>Your Password</label>
            <input
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}

            <label id='firstname'>Your First name</label>
            <input
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}

            <label id='lastname'>Your Last name</label>
            <input
              type='text'
              name='lastname'
              value={values.lastname}
              onChange={handleChange}
            />
            {errors.lastname && <p>{errors.lastname}</p>}

            <label id='pseudo'>Your Username</label>
            <input
              type='text'
              name='pseudo'
              value={values.pseudo}
              onChange={handleChange}
            />
            {errors.pseudo && <p>{errors.pseudo}</p>}

            <label id='phone'>Your Phone</label>
            <input
              type='tel'
              name='phone'
              value={values.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}

            <button type='submit'>Create account!</button>

          </form>
          <div>Already got an account? Log in <Link to={'/FormLogin'}>Here!</Link></div>
        </div>
      </div>
    </div>
  )
}

export default FormSignup