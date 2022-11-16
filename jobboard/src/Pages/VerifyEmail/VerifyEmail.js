import React, { useEffect } from 'react'
import NavBar from '../../Components/Navbar';
import axios from 'axios';

function VerifyEmail() {
  document.title = 'Email Verified!';
  const token = window.location.pathname.split('/')[2];
  const [response, setResponse] = React.useState('');
  const verify = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/verify/mailconfirm/${token}`);
      setResponse(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      await timeout(10);
      if (!isCancelled) {
        verify();
      }
    };
    handleChange();
    return () => {
      isCancelled = true;
    };
  })
  return (
    <div>
      <NavBar />
      <h1>{response}</h1>
    </div>
  )
}

export default VerifyEmail