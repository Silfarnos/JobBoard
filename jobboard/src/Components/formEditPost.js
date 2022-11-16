import React, { useState, useEffect } from 'react'

function formEditPost() {
  const [values, setValues] = useState({
    title: '',
      wages: '',
      location: '',
      workingTime: '',
      contractType: '',
      description: '',
      shortDecription: '',
      firstQuestion: '',
      secondQuestion: '',
      thirdQuestion: '',
      keywords: [],
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

export default formEditPost