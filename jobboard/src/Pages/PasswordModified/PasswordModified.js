import React from 'react'
import NavBar from '../../Components/Navbar';
import axios from 'axios';

function PasswordModified() {
  document.title = 'Password Modified!';
  const token = window.location.pathname.split('/')[2];
  const [response, setResponse] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleChangeConfirmPassword(e) {
    setconfirmPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      password: password,
      newPassword: confirmPassword
    }
    try {
      let res = await axios.post(`http://localhost:3000/api/verify/resetpassword/${token}`, data);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <NavBar />
      PasswordModified
      <h1>{response}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Enter your new password
          <input type="password" placeholder="Password" onChange={handleChangePassword} />
        </label>
        <label>
          confirm your new password
          <input type="password" placeholder="Confirm Password" onChange={handleChangeConfirmPassword} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PasswordModified
