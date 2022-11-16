import React, { useState, useEffect } from 'react'

function useForm() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    newpassword: '',
    phone: '',
    lastname: '',
    name: '',
    pseudo: ''
  })


  const handleChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }
  return { handleChange, values }
}

export default useForm